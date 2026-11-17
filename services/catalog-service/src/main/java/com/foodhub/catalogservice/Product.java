package com.foodhub.catalogservice;
import jakarta.persistence.*;
import java.math.BigDecimal;
@Entity @Table(name="products")
public class Product {
 @Id @GeneratedValue(strategy=GenerationType.IDENTITY) private Long id;
 @Column(nullable=false,length=120) private String name;
 @Column(length=1000) private String description;
 @Column(nullable=false,precision=10,scale=2) private BigDecimal price;
 @Column(nullable=false) private boolean available=true;
 protected Product(){}
 public Product(String n,String d,BigDecimal p,boolean a){name=n;description=d;price=p;available=a;}
 public Long getId(){return id;} public String getName(){return name;} public String getDescription(){return description;}
 public BigDecimal getPrice(){return price;} public boolean isAvailable(){return available;}
 public void setAvailable(boolean a){available=a;}
}
