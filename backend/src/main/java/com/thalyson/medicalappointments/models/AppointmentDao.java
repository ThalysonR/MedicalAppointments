package com.thalyson.medicalappointments.models;

import java.sql.Connection;
import java.sql.Date;
import java.sql.PreparedStatement;
import java.sql.ResultSet;
import java.sql.SQLException;
import java.time.LocalDate;
import java.time.format.DateTimeFormatter;
import java.util.ArrayList;
import java.util.List;

public class AppointmentDao {
    public static void create(Appointment appointment, String userMail, Connection conn) {
        try {
            DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            String sql = "INSERT INTO appointments (doctor_id, user_mail, day, hour) VALUES (?, ?, ?, ?);";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setLong(1, appointment.getDoctor().getId());
            ps.setString(2, userMail);
            ps.setDate(3, Date.valueOf(LocalDate.parse(appointment.getDay(), fmt)));
            ps.setInt(4, appointment.getHour());
            ps.execute();
            ps.close();
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }

    public static List<Appointment> readAll(String userMail, Connection conn) {
        try {
            DateTimeFormatter fmt = DateTimeFormatter.ofPattern("dd/MM/yyyy");
            List<Appointment> appointments = new ArrayList<>();
            String sql = "SELECT a.id, d.id, d.name, d.speciality, a.user_mail, a.day, a.hour FROM appointments a INNER JOIN doctor d ON a.doctor_id = d.id WHERE a.user_mail = ?";
            PreparedStatement ps = conn.prepareStatement(sql);
            ps.setString(1, userMail);
            ResultSet rs = ps.executeQuery();
            while (rs.next()) {
                Doctor d = new Doctor();
                d.setId(rs.getLong("d.id"));
                d.setName(rs.getString("d.name"));
                d.setSpeciality(rs.getString("d.speciality"));
                Appointment a = new Appointment();
                a.setDoctor(d);
                a.setId(rs.getLong("a.id"));
                a.setDay(rs.getDate("a.day").toLocalDate().format(fmt));
                a.setHour(rs.getInt("a.hour"));
                a.setUserMail(rs.getString("a.user_mail"));
                appointments.add(a);
            }
            ps.close();
            return appointments;
        } catch (SQLException e) {
            throw new RuntimeException(e);
        }
    }
}