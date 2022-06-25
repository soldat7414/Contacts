package com.soldat.Contacts.controllers;

import com.soldat.Contacts.entities.PhoneNumberEntity;
import com.soldat.Contacts.exceptions.AlreadyExistException;
import com.soldat.Contacts.exceptions.NotFoundException;
import com.soldat.Contacts.services.PhoneNumberService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author Ihor Soldatenko
 * @date 24.06.2022
 */

@RestController
@RequestMapping("/phones")
public class PhoneNumberController {

    private final PhoneNumberService service;

    public PhoneNumberController(PhoneNumberService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> add(@RequestBody PhoneNumberEntity phoneNumberEntity,
                                @RequestParam long personId) {
        try {
            return ResponseEntity.ok(service.add(phoneNumberEntity, personId));
        } catch (AlreadyExistException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage() + ex.getId());
        } catch (NotFoundException e) {
            return ResponseEntity.badRequest().body(e.getMessage());
        }
    }

    @PostMapping("/{phoneNumberId}")
    public ResponseEntity<?> edit(@RequestBody PhoneNumberEntity phoneNumberEntity,
                                  @PathVariable long phoneNumberId) {
        try {
            return ResponseEntity.ok(service.edit(phoneNumberId, phoneNumberEntity));
        } catch (NotFoundException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping("/{phoneNumberId}")
    public ResponseEntity<?> get(@PathVariable long phoneNumberId) {
        try {
            return ResponseEntity.ok(service.getById(phoneNumberId));
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

    @DeleteMapping("/{phoneNumberId}")
    public ResponseEntity<?> delete(@PathVariable long phoneNumberId) {
        try {
            return ResponseEntity.ok(service.delete(phoneNumberId) + " Deleted");
        } catch (NotFoundException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
