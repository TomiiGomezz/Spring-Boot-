package com.example.demo_api_rest.repository;

import com.example.demo_api_rest.entity.Product;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.stereotype.Repository;

@Repository
public interface ProductRepository  extends JpaRepository <Product, Long> {
}
