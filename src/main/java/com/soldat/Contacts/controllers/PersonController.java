package com.soldat.Contacts.controllers;

import com.soldat.Contacts.entities.Person;
import com.soldat.Contacts.repositopies.PersonRepo;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import java.util.ArrayList;
import java.util.List;
import java.util.stream.Stream;

/**
 * @author Ihor Soldatenko
 * @date 24.06.2022
 */

@RestController
@RequestMapping("/person")
public class PersonController {

    @Autowired
    private PersonRepo repo;

    @PostMapping
    public ResponseEntity<?> add (@RequestBody Person person){
        try{
            return ResponseEntity.ok(repo.save(person));
        }catch (Exception ex){
            return ResponseEntity.badRequest().body("Exception!!!");
        }
    }

    @GetMapping ("/{personId}")
    public ResponseEntity<?> get (@PathVariable long personId){
        try{
            return ResponseEntity.ok(repo.findById(personId));
        }catch (Exception ex){
            return ResponseEntity.badRequest().body("Exception!!!");
        }
    }

    @GetMapping
    public ResponseEntity<?> getAll (){
        try{
            Iterable<Person> people = repo.findAll();
            List<Person> all = new ArrayList<>();
            people.forEach(all::add);
            return ResponseEntity.ok(all);
        }catch (Exception ex){
            return ResponseEntity.badRequest().body("Exception!!!");
        }
    }

    @DeleteMapping ("/{personId}")
    public ResponseEntity<?> delete (@PathVariable long personId){
        try{
            repo.deleteById(personId);
            return ResponseEntity.ok("Deleted");
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @DeleteMapping
    public ResponseEntity<?> deleteAll (){
        try{
            repo.deleteAll();
            return ResponseEntity.ok("Deleted");
        }catch (Exception ex){
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

}
