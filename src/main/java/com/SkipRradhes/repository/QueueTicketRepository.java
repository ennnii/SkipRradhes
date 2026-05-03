package com.SkipRradhes.repository;

import com.SkipRradhes.model.QueueTicket;
import com.SkipRradhes.enums.TicketStatus;
import org.springframework.data.jpa.repository.JpaRepository;
import java.util.List;
import java.util.Optional;

public interface QueueTicketRepository extends JpaRepository<QueueTicket, Long> {

    Optional<QueueTicket> findByQrCode(String qrCode);
    Optional<QueueTicket> findByTicketCode(String ticketCode);
    List<QueueTicket> findByBusinessIdAndStatusIn(Long bizId, List<TicketStatus> statuses);
}