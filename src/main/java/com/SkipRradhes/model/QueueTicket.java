package com.SkipRradhes.model;

import com.fasterxml.jackson.annotation.JsonIgnore;
import com.SkipRradhes.enums.ServiceType;
import com.SkipRradhes.enums.TicketStatus;
import jakarta.persistence.*;
import lombok.*;
import java.time.LocalDateTime;

@Entity
@Table(name = "queue_tickets")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class QueueTicket {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(unique = true, nullable = false)
    private String ticketCode;

    @Column(unique = true, nullable = false)
    private String qrCode;

    private String clientName;
    private String clientPhone;

    @Enumerated(EnumType.STRING)
    private ServiceType serviceType;

    private String serviceDetail;
    private String branchName;

    @Enumerated(EnumType.STRING)
    private TicketStatus status;

    private int positionInQueue;
    private int estimatedWaitMinutes;
    private String assignedStaff;
    private boolean blocked;

    private LocalDateTime createdAt;
    private LocalDateTime estimatedCallTime;
    private LocalDateTime calledAt;
    private LocalDateTime completedAt;

    @JsonIgnore
    @ManyToOne(fetch = FetchType.LAZY)
    @JoinColumn(name = "business_id")
    private Business business;
}