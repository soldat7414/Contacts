package com.soldat.Contacts.entities;

import com.soldat.Contacts.entities.models.PhoneNumber;

import javax.persistence.*;

/**
 * @author Ihor Soldatenko
 * @date 25.06.2022
 */

@Entity
public class PhoneNumberEntity {
    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private long id;
    private String phoneNumber;
    @ManyToOne
    @PrimaryKeyJoinColumn
    private PersonEntity personEntity;

    public PhoneNumberEntity() {
    }

    public PhoneNumber toModel() {
        return PhoneNumber.toModel(this);
    }

    public long getId() {
        return id;
    }

    public void setId(long id) {
        this.id = id;
    }

    public String getPhoneNumber() {
        return phoneNumber;
    }

    public void setPhoneNumber(String phoneNumber) {
        this.phoneNumber = phoneNumber;
    }

    public PersonEntity getPersonEntity() {
        return personEntity;
    }

    public void setPersonEntity(PersonEntity personEntity) {
        this.personEntity = personEntity;
    }
}
