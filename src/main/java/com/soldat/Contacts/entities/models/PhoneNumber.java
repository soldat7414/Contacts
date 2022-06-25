package com.soldat.Contacts.entities.models;

import com.soldat.Contacts.entities.PersonEntity;
import com.soldat.Contacts.entities.PhoneNumberEntity;

import javax.persistence.*;
import java.util.List;
import java.util.stream.Collectors;

/**
 * @author Ihor Soldatenko
 * @date 25.06.2022
 */

public class PhoneNumber {
    private long id;
    private String phoneNumber;

    public PhoneNumber() {
    }

    public static PhoneNumber toModel (PhoneNumberEntity phoneNumberEntity){
        PhoneNumber phoneNumber = new PhoneNumber();
        phoneNumber.setId(phoneNumberEntity.getId());
        phoneNumber.setPhoneNumber(phoneNumberEntity.getPhoneNumber());
        return phoneNumber;
    }

    public static List<PhoneNumber> toModelList (List<PhoneNumberEntity> phoneNumberEntities){
        return phoneNumberEntities.stream().map(PhoneNumber::toModel).collect(Collectors.toList());
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
}
