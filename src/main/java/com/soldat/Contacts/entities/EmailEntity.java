package com.soldat.Contacts.entities;

import com.soldat.Contacts.entities.models.Email;

import javax.persistence.*;

/**
 * @author Ihor Soldatenko
 * @date 25.06.2022
 */

@Entity
public class EmailEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String email;
    @ManyToOne
    @PrimaryKeyJoinColumn
    private PersonEntity personEntity;

    public EmailEntity() {
    }

    public Email toModel(){
        return Email.toModel(this);
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getEmail() {
        return email;
    }

    public void setEmail(String email) {
        this.email = email;
    }

    public PersonEntity getPersonEntity() {
        return personEntity;
    }

    public void setPersonEntity(PersonEntity personEntity) {
        this.personEntity = personEntity;
    }
}
