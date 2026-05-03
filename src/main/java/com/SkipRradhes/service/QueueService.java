package com.SkipRradhes.service;

import com.SkipRradhes.dto.JoinQueueRequest;
import com.SkipRradhes.dto.TicketResponse;
import com.SkipRradhes.enums.ServiceType;
import com.SkipRradhes.enums.TicketStatus;
import com.SkipRradhes.model.Business;
import com.SkipRradhes.model.QueueTicket;
import com.SkipRradhes.repository.BusinessRepository;
import com.SkipRradhes.repository.QueueTicketRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;

import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.List;
import java.util.UUID;

@Service
@RequiredArgsConstructor
public class QueueService {

    private final QueueTicketRepository ticketRepo;
    private final BusinessRepository businessRepo;

    public TicketResponse joinQueue(JoinQueueRequest req) {
        Business business = businessRepo.findByBranch(req.getBranchName())
                .orElseThrow(() -> new RuntimeException("Dega nuk u gjet: " + req.getBranchName()));

        List<QueueTicket> active = ticketRepo.findByBusinessIdAndStatusIn(
                business.getId(),
                List.of(TicketStatus.WAITING, TicketStatus.ACTIVE)
        );

        int position = active.size() + 1;

        ServiceType type = ServiceType.valueOf(req.getServiceType().toUpperCase());
        int avgMin = switch (type) {
            case BANK   -> business.getAvgBankMinutes();
            case CLINIC -> business.getAvgClinicMinutes();
            case ADMIN  -> business.getAvgAdminMinutes();
        };

        int waitMin = (position - 1) * avgMin;
        LocalDateTime callTime = LocalDateTime.now().plusMinutes(waitMin);

        String prefix = switch (type) {
            case BANK   -> "A";
            case CLINIC -> "B";
            case ADMIN  -> "C";
        };

        String ticketCode = prefix + "-" + String.format("%03d", position + 40);
        String qrCode = UUID.randomUUID().toString();

        QueueTicket ticket = QueueTicket.builder()
                .ticketCode(ticketCode)
                .qrCode(qrCode)
                .clientName(req.getClientName())
                .clientPhone(req.getClientPhone())
                .serviceType(type)
                .serviceDetail(req.getServiceDetail())
                .branchName(req.getBranchName())
                .status(TicketStatus.WAITING)
                .positionInQueue(position)
                .estimatedWaitMinutes(waitMin)
                .blocked(false)
                .createdAt(LocalDateTime.now())
                .estimatedCallTime(callTime)
                .business(business)
                .build();

        ticketRepo.save(ticket);

        return TicketResponse.builder()
                .ticketCode(ticketCode)
                .qrCode(qrCode)
                .clientName(req.getClientName())
                .serviceDetail(req.getServiceDetail())
                .branchName(req.getBranchName())
                .positionInQueue(position)
                .estimatedWaitMinutes(waitMin)
                .estimatedCallTime(callTime.format(DateTimeFormatter.ofPattern("HH:mm")))
                .status("WAITING")
                .build();
    }

    public QueueTicket callTicket(Long ticketId) {
        QueueTicket t = ticketRepo.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Bileta nuk u gjet"));
        t.setStatus(TicketStatus.CALLED);
        t.setCalledAt(LocalDateTime.now());
        return ticketRepo.save(t);
    }

    public QueueTicket toggleBlock(Long ticketId) {
        QueueTicket t = ticketRepo.findById(ticketId)
                .orElseThrow(() -> new RuntimeException("Bileta nuk u gjet"));
        t.setBlocked(!t.isBlocked());
        if (t.isBlocked()) t.setStatus(TicketStatus.CANCELLED);
        return ticketRepo.save(t);
    }

    public List<QueueTicket> getLiveQueue(Long businessId) {
        return ticketRepo.findByBusinessIdAndStatusIn(
                businessId,
                List.of(TicketStatus.WAITING, TicketStatus.ACTIVE,
                        TicketStatus.CALLED, TicketStatus.DELAYED)
        );
    }

    public QueueTicket getByQrCode(String qrCode) {
        return ticketRepo.findByQrCode(qrCode)
                .orElseThrow(() -> new RuntimeException("QR Code nuk u gjet"));
    }
}