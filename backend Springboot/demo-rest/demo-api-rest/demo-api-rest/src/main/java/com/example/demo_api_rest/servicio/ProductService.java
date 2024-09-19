package com.example.demo_api_rest.servicio;

import com.example.demo_api_rest.entity.Product;
import com.example.demo_api_rest.repository.ProductRepository;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Repository;

import java.util.List;


@Repository
 public class ProductService {

    @Autowired
    ProductRepository productRepository;
    //metodos findall
    public List<Product> findAll() {
        return productRepository.findAll();
    }

    //Metodo findByID
     public Product findById(Long id){
        return productRepository.findById(id).orElse(null);
     }
     //metodo guardar

    public Product save(Product product){

        return  productRepository.save(product);
    }


        //metodo actualizar

    public  Product productUpdate(Long id, Product product){
        Product productToUpdate = findById(id);
        if (productToUpdate ==  null){
            return  null;

        }else {
            productToUpdate.setName(product.getName());
            productToUpdate.setPrice(product.getPrice());
            productToUpdate.setQuantity(product.getQuantity());
            productRepository.save(productToUpdate);
            return productToUpdate;
        }
    }
//metodo delete


    public  void productDelete(long id){
        Product productDelete = findById(id);
        if (productDelete != null){
            productRepository.deleteById(id);
        }
    }

}

