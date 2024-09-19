package com.example.demo_api_rest.controller;


import com.example.demo_api_rest.entity.Product;
import com.example.demo_api_rest.repository.ProductRepository;
import com.example.demo_api_rest.servicio.ProductService;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

@CrossOrigin("*")
@RestController
@RequestMapping("/api/v1/products")
public class ProductController {

    @Autowired
    private  ProductService productService;
    @Autowired
    private ProductRepository productRepository;

    @GetMapping
    public ResponseEntity getAllProducts() {
        return ResponseEntity.ok(productService.findAll());
    }
    @GetMapping("/{id}")
    public  ResponseEntity<?> getProductById(@PathVariable Long id) {
        Product products = productService.findById(id);
        if (products == null){
            return ResponseEntity.notFound().build();
        }else{
            return ResponseEntity.ok(products);
        }

    }
    @PostMapping
    public ResponseEntity<?> save(@RequestBody Product product) {
        return ResponseEntity.status(HttpStatus.CREATED).body(productService.save(product));
    }

    @PutMapping("/{id}")
    public ResponseEntity<?> updateProduct(@PathVariable Long id, @RequestBody Product product) {
            Product productToUpdate = productService.productUpdate(id, product);
            if (productToUpdate == null){
                return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Product not found");
            }else{
                return ResponseEntity.ok(productToUpdate);
            }
    }

    @DeleteMapping("/{id}")
    public ResponseEntity<?> deleteProductById(@PathVariable Long id) {
        productService.productDelete(id);
        return ResponseEntity.ok().build();
    }
}

