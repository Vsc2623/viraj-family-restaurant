package com.foodhub.orderservice;
import jakarta.persistence.*;
import java.math.BigDecimal;
import java.time.Instant;
@Entity @Table(name="customer_orders")
public class CustomerOrder {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false) private String customerName;
 @Column(nullable=false) private Long productId;
 @Column(nullable=false) private String productName;
 @Column(nullable=false) private Integer quantity;
 @Column(nullable=false,precision=10,scale=2) private BigDecimal unitPrice,totalAmount;
 @Column(nullable=false) private String status;
 @Column(nullable=false) private Instant createdAt;
 protected CustomerOrder(){}
 public CustomerOrder(String c,Long p,String n,Integer q,BigDecimal price){customerName=c;productId=p;productName=n;quantity=q;unitPrice=price;totalAmount=price.multiply(BigDecimal.valueOf(q));status="PLACED";createdAt=Instant.now();}
 public Long getId(){return id;} public String getCustomerName(){return customerName;} public Long getProductId(){return productId;}
 public String getProductName(){return productName;} public Integer getQuantity(){return quantity;} public BigDecimal getUnitPrice(){return unitPrice;}
 public BigDecimal getTotalAmount(){return totalAmount;} public String getStatus(){return status;} public Instant getCreatedAt(){return createdAt;}
}
