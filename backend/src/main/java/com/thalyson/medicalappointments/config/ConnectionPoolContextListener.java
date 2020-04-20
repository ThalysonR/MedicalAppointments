package com.thalyson.medicalappointments.config;

import javax.servlet.ServletContext;
import javax.servlet.ServletContextEvent;
import javax.servlet.ServletContextListener;
import javax.servlet.annotation.WebListener;
import javax.sql.DataSource;

import com.zaxxer.hikari.HikariConfig;
import com.zaxxer.hikari.HikariDataSource;

@WebListener("Creates a connection pool that is stored in the Servlet's context for later use.")
public class ConnectionPoolContextListener implements ServletContextListener {

    private static final String CLOUD_SQL_CONNECTION_NAME = System.getenv("CLOUD_SQL_CONNECTION_NAME");
    private static final String DB_USER = System.getenv("DB_USER");
    private static final String DB_PASS = System.getenv("DB_PASS");
    private static final String DB_NAME = System.getenv("DB_NAME");

    private DataSource createConnectionPool() {
        HikariConfig config = new HikariConfig();

        config.setJdbcUrl(String.format("jdbc:mysql:///%s", DB_NAME));
        config.setUsername(DB_USER);
        config.setPassword(DB_PASS);

        config.addDataSourceProperty("socketFactory", "com.google.cloud.sql.mysql.SocketFactory");
        config.addDataSourceProperty("cloudSqlInstance", CLOUD_SQL_CONNECTION_NAME);

        config.setMaximumPoolSize(5);
        config.setMinimumIdle(5);
        config.setConnectionTimeout(10000); // 10 seconds
        config.setIdleTimeout(600000); // 10 minutes
        config.setMaxLifetime(1800000); // 30 minutes
        DataSource pool = new HikariDataSource(config);
        return pool;
    }

    @Override
    public void contextDestroyed(ServletContextEvent event) {
        // This function is called when the Servlet is destroyed.
        HikariDataSource pool = (HikariDataSource) event.getServletContext().getAttribute("db-pool");
        if (pool != null) {
            pool.close();
        }
    }

    @Override
    public void contextInitialized(ServletContextEvent event) {
        // This function is called when the application starts and will safely create a
        // connection pool
        // that can be used to connect to.
        ServletContext servletContext = event.getServletContext();
        DataSource pool = (DataSource) servletContext.getAttribute("db-pool");
        if (pool == null) {
            pool = createConnectionPool();
            servletContext.setAttribute("db-pool", pool);
        }
    }
}