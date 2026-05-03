package com.SkipRradhes.model;

import jakarta.persistence.*;
import lombok.*;
import java.util.List;

@Entity
@Table(name = "businesses")
@Data
@Builder
@NoArgsConstructor
@AllArgsConstructor
public class Business {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    private String name;
    private String branch;
    private String plan;
    private boolean active;

    private int avgBankMinutes;
    private int avgClinicMinutes;
    private int avgAdminMinutes;

    @OneToMany(mappedBy = "business", cascade = CascadeType.ALL)
    private List<QueueTicket> tickets;
}