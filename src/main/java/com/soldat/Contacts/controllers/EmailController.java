package com.soldat.Contacts.controllers;

import com.soldat.Contacts.entities.EmailEntity;
import com.soldat.Contacts.exceptions.AlreadyExistException;
import com.soldat.Contacts.exceptions.NotFoundException;
import com.soldat.Contacts.services.EmailService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author Ihor Soldatenko
 * @date 24.06.2022
 */

@RestController
@RequestMapping("/emails")
public class EmailController {

    private final EmailService service;

    public EmailController(EmailService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> add(@RequestBody EmailEntity emailEntity,
                                @RequestParam long personId) {
        try {
            return ResponseEntity.ok(service.add(emailEntity, personId));
        } catch (AlreadyExistException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage() + ex.getId());
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{emailId}")
    public ResponseEntity<?> edit(@RequestBody EmailEntity emailEntity,
                                  @PathVariable long emailId) {
        try {
            return ResponseEntity.ok(service.edit(emailId, emailEntity));
        } catch (NotFoundException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping("/{emailId}")
    public ResponseEntity<?> get(@PathVariable long emailId) {
        try {
            return ResponseEntity.ok(service.getById(emailId));
        } catch (NotFoundException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

//    @GetMapping
//    public ResponseEntity<?> getAll() {
//        try {
//            return ResponseEntity.ok(service.getAll());
//        } catch (Exception ex) {
//            return ResponseEntity.badRequest().body("Exception!!!");
//        }
//    }

    @GetMapping
    public ResponseEntity<?> getByPerson(@RequestParam long personId) {
        try {
            return ResponseEntity.ok(service.getByPerson(personId));
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("Exception!!!");
        }
    }

    @DeleteMapping("/{emailId}")
    public ResponseEntity<?> delete(@PathVariable long emailId) {
        try {
            return ResponseEntity.ok(service.delete(emailId) + " Deleted");
        } catch (NotFoundException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
