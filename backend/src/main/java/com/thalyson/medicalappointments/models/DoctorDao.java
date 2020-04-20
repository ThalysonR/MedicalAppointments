package com.thalyson.medicalappointments.models;

import java.sql.Connection;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.util.ArrayList;
import java.util.List;

public class DoctorDao {

    public static void create(Doctor doctor, Connection conn) {
        try {
            String sql = "INSERT INTO doctor (name, speciality, description) VALUES (?, ?, ?);";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, doctor.getName());
            ps.setString(2, doctor.getSpeciality());
            ps.setString(3, doctor.getDescription());
            ps.execute();
            ps.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public static List<Doctor> readAll(Connection conn) {
        try {
            List<Doctor> doctors = new ArrayList<>();
            String sql = "SELECT id, name, speciality, description FROM doctor";
            PreparedStatement ps = conn.prepareStatement(sql);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Doctor doctor = new Doctor();
                doctor.setId(rs.getLong("id"));
                doctor.setName(rs.getString("name"));
                doctor.setSpeciality(rs.getString("speciality"));
                doctor.setDescription(rs.getString("description"));
                doctors.add(doctor);
            }
            ps.close();
            return doctors;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}