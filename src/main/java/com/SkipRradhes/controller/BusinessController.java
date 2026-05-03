package com.SkipRradhes.controller;

import com.SkipRradhes.model.QueueTicket;
import com.SkipRradhes.service.QueueService;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@RestController
@RequestMapping("/api/business")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class BusinessController {

    private final QueueService queueService;

    @GetMapping("/{businessId}/queue")
    public ResponseEntity<List<QueueTicket>> getLiveQueue(@PathVariable Long businessId) {
        return ResponseEntity.ok(queueService.getLiveQueue(businessId));
    }

    @PutMapping("/ticket/{ticketId}/call")
    public ResponseEntity<QueueTicket> callTicket(@PathVariable Long ticketId) {
        return ResponseEntity.ok(queueService.callTicket(ticketId));
    }

    @PutMapping("/ticket/{ticketId}/block")
    public ResponseEntity<QueueTicket> toggleBlock(@PathVariable Long ticketId) {
        return ResponseEntity.ok(queueService.toggleBlock(ticketId));
    }
}