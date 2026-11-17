package com.foodhub.paymentservice;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
@Entity @Table(name="payments")
public class Payment {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false,unique=true) private Long orderId;
 @Column(nullable=false,precision=10,scale=2) private BigDecimal amount;
 @Column(nullable=false) private String method,status;
 @Column(nullable=false) private Instant createdAt;
 protected Payment(){}
 public Payment(Long o,BigDecimal a,String m){orderId=o;amount=a;method=m;status="SIMULATED_SUCCESS";createdAt=Instant.now();}
 public Long getId(){return id;} public Long getOrderId(){return orderId;} public BigDecimal getAmount(){return amount;}
 public String getMethod(){return method;} public String getStatus(){return status;} public Instant getCreatedAt(){return createdAt;}
}
