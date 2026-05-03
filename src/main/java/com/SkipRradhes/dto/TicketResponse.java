package com.SkipRradhes.dto;

import lombok.Builder;
import lombok.Data;

@Data
@Builder
public class TicketResponse {
    private String ticketCode;
    private String qrCode;
    private String clientName;
    private String serviceDetail;
    private String branchName;
    private int positionInQueue;
    private int estimatedWaitMinutes;
    private String estimatedCallTime;
    private String status;
}