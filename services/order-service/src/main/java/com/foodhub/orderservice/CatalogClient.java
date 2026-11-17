package com.foodhub.orderservice;
import org.springframework.beans.factory.annotation.Value;
import org.springframework.stereotype.Component;
import org.springframework.web.client.RestClient;
import java.math.BigDecimal;
@Component public class CatalogClient {
 private final RestClient client;
 public CatalogClient(@Value("${CATALOG_SERVICE_URL:http://localhost:8081}") String url){client=RestClient.builder().baseUrl(url).build();}
 public ProductResponse get(Long id){try{return client.get().uri("/api/products/{id}",id).retrieve().body(ProductResponse.class);}
 catch(Exception e){throw new IllegalArgumentException("Catalog service unavailable or product not found");}}
 public record ProductResponse(Long id,String name,String description,BigDecimal price,boolean available){}
}
