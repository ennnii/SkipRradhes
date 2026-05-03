package com.SkipRradhes.controller;

import com.SkipRradhes.model.QueueTicket;
import com.SkipRradhes.service.QueueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.security.access.prepost.PreAuthorize;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/business")
@RequiredArgsConstructor
@CrossOrigin(origins = "${cors.allowed-origins}")
public class BusinessController {

    private final QueueService queueService;

    @GetMapping("/{businessId}/queue")
    @PreAuthorize("hasRole('BUSINESS') or hasRole('STAFF')")
    public ResponseEntity<List<QueueTicket>> getLiveQueue(@PathVariable Long businessId) {
        return ResponseEntity.ok(queueService.getLiveQueue(businessId));
    }

    @PutMapping("/ticket/{ticketId}/call")
    @PreAuthorize("hasRole('BUSINESS') or hasRole('STAFF')")
    public ResponseEntity<QueueTicket> callTicket(@PathVariable Long ticketId) {
        return ResponseEntity.ok(queueService.callTicket(ticketId));
    }

    @PutMapping("/ticket/{ticketId}/block")
    @PreAuthorize("hasRole('BUSINESS')")
    public ResponseEntity<QueueTicket> toggleBlock(@PathVariable Long ticketId) {
        return ResponseEntity.ok(queueService.toggleBlock(ticketId));
    }
}