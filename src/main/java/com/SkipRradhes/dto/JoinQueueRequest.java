package com.SkipRradhes.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.Data;

@Data
public class JoinQueueRequest {
    @NotBlank private String clientName;
    @NotBlank private String clientPhone;
    @NotBlank private String serviceType;
    @NotBlank private String serviceDetail;
    @NotBlank private String branchName;
    private String preferredHour;
}