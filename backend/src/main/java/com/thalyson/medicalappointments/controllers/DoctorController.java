/*
 * Copyright 2016 Google Inc.
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

package com.thalyson.medicalappointments.controllers;

import java.sql.Connection;
import java.sql.SQLException;
import java.util.List;

import javax.servlet.ServletContext;
import javax.sql.DataSource;

import com.google.api.server.spi.auth.EspAuthenticator;
import com.google.api.server.spi.auth.common.User;
import com.google.api.server.spi.config.Api;
import com.google.api.server.spi.config.ApiIssuer;
import com.google.api.server.spi.config.ApiIssuerAudience;
import com.google.api.server.spi.config.ApiMethod;
import com.google.api.server.spi.config.ApiNamespace;
import com.google.api.server.spi.response.InternalServerErrorException;
import com.google.api.server.spi.response.UnauthorizedException;
import com.thalyson.medicalappointments.models.Doctor;
import com.thalyson.medicalappointments.models.DoctorDao;

@Api(name = "ma", version = "v1", namespace = @ApiNamespace(ownerDomain = "echo.example.com", ownerName = "echo.example.com", packagePath = ""), authenticators = {
    EspAuthenticator.class }, issuers = {
        @ApiIssuer(name = "firebase", issuer = "https://securetoken.google.com/medical-appointments-274517", jwksUri = "https://www.googleapis.com/service_accounts/v1/metadata/x509/securetoken@system"
            + ".gserviceaccount.com") }, issuerAudiences = {
                @ApiIssuerAudience(name = "firebase", audiences = { "medical-appointments-274517" }) })
public class DoctorController {

  @ApiMethod(path = "doctor", httpMethod = ApiMethod.HttpMethod.POST)
  public void createDoctor(Doctor doctor, User user, ServletContext context)
      throws InternalServerErrorException, UnauthorizedException {
    if (user == null) {
      throw new UnauthorizedException("Invalid Credentials");
    }
    DataSource pool = (DataSource) context.getAttribute("db-pool");
    try (Connection conn = pool.getConnection()) {
      DoctorDao.create(doctor, conn);
    } catch (SQLException e) {
      throw new InternalServerErrorException(e);
    }
  }

  @ApiMethod(path = "doctor", httpMethod = ApiMethod.HttpMethod.GET)
  public List<Doctor> getAllDoctors(User user, ServletContext context)
      throws InternalServerErrorException, UnauthorizedException {
    if (user == null) {
      throw new UnauthorizedException("Invalid Credentials");
    }
    DataSource pool = (DataSource) context.getAttribute("db-pool");
    try (Connection conn = pool.getConnection()) {
      List<Doctor> doctors = DoctorDao.readAll(conn);
      return doctors;
    } catch (SQLException e) {
      throw new InternalServerErrorException(e);
    }
  }

}
