package com.example.SpringMongoProject.Entity;

import org.bson.types.ObjectId;

public class CustomIdGenerator {
    private static int sequence = 0;

    public static String generateId() {

        String idString = String.format("R-%03d", ++sequence);
        return idString;
    }

    public static void resetSequence() {
        sequence = 0;
    }
}
