package com.soldat.Contacts.controllers;

import com.soldat.Contacts.entities.PersonEntity;
import com.soldat.Contacts.exceptions.AlreadyExistException;
import com.soldat.Contacts.exceptions.NotFoundException;
import com.soldat.Contacts.services.PersonService;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

/**
 * @author Ihor Soldatenko
 * @date 24.06.2022
 */

@RestController
@RequestMapping("/persons")
public class PersonController {

    private final PersonService service;

    public PersonController(PersonService service) {
        this.service = service;
    }

    @PostMapping
    public ResponseEntity<?> add(@RequestBody PersonEntity personEntity) {
        try {
            return ResponseEntity.ok(service.add(personEntity));
        } catch (AlreadyExistException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage() + ex.getId());
        }
    }

    @PostMapping("/{personId}")
    public ResponseEntity<?> edit(@RequestBody PersonEntity personEntity,
                                  @PathVariable long personId) {
        try {
            return ResponseEntity.ok(service.edit(personId, personEntity));
        } catch (NotFoundException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping("/{personId}")
    public ResponseEntity<?> get(@PathVariable long personId) {
        try {
            return ResponseEntity.ok(service.getById(personId));
        } catch (NotFoundException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }

    @GetMapping
    public ResponseEntity<?> getAll() {
        try {
            return ResponseEntity.ok(service.getAll());
        } catch (Exception ex) {
            return ResponseEntity.badRequest().body("Exception!!!");
        }
    }

    @DeleteMapping("/{personId}")
    public ResponseEntity<?> delete(@PathVariable long personId) {
        try {
            return ResponseEntity.ok(service.delete(personId) + " Deleted");
        } catch (NotFoundException ex) {
            return ResponseEntity.badRequest().body(ex.getMessage());
        }
    }
}
