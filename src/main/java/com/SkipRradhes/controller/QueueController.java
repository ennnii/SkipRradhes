package com.SkipRradhes.controller;

import com.SkipRradhes.dto.JoinQueueRequest;
import com.SkipRradhes.dto.TicketResponse;
import com.SkipRradhes.service.QueueService;
import jakarta.validation.Valid;
import lombok.RequiredArgsConstructor;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@RestController
@RequestMapping("/api/queue")
@RequiredArgsConstructor
@CrossOrigin(origins = "*")
public class QueueController {

    private final QueueService queueService;

    @PostMapping("/join")
    public ResponseEntity<TicketResponse> join(@Valid @RequestBody JoinQueueRequest req) {
        return ResponseEntity.ok(queueService.joinQueue(req));
    }

    @GetMapping("/ticket/{qrCode}")
    public ResponseEntity<?> getTicket(@PathVariable String qrCode) {
        return ResponseEntity.ok(queueService.getByQrCode(qrCode));
    }
}