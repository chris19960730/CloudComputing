package org.angularbaby.test;

import org.json.JSONArray;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.RestController;

import java.sql.*;

@RestController
public class PostgresControl {
    private static String driverName = "org.postgresql.Driver";//jdbc驱动路径
    private static String url = "jdbc:postgresql://localhost:5432/postgres";//hive库地址+库名
    private static String user = "postgres";//用户名
    private static String password = "1111";//密码
    private static String sql = "";
    private static ResultSet res;

    @RequestMapping("/local")
    public String reviews(@RequestParam(name="sql") String sql) {
        Connection conn = null;
        Statement stmt = null;
        try {
            conn = getConn();
            stmt = conn.createStatement();
            //String tableName="customer";//hive表名

            //sql = "select * from " + tableName;

            String sqll = sql;
            System.out.println("Running:" + sql);
            res = stmt.executeQuery(sqll);
            System.out.println("执行 select * query 运行结果:");
            JSONArray jsonArray = org.angularbaby.test.JsonUtil.formatRsToJsonArray(res);

            return jsonArray.toString();

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            System.exit(1);
        } catch (Exception e) {
            e.printStackTrace();
            System.exit(1);
        } finally {
            try {
                if(stmt!=null){
                    stmt.close();
                    stmt=null;
                }
                if (conn != null) {
                    conn.close();
                    conn = null;
                }
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return "helloworld";
    }

    private static Connection getConn() throws ClassNotFoundException,
            SQLException {
        Class.forName(driverName);
        Connection conn = DriverManager.getConnection(url, user, password);
        return conn;
    }
}