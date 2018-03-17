package org.angularbaby.test;

import org.json.JSONArray;
import org.springframework.web.bind.annotation.*;
import org.stringtemplate.v4.ST;

import java.sql.*;

@RestController
public class HiveControl {
    private static String driverName = "org.apache.hive.jdbc.HiveDriver";//jdbc驱动路径
    private static String url = "jdbc:hive2://localhost:10000/salesystem";//hive库地址+库名
    private static String user = "hadoop";//用户名
    private static String password = "1111";//密码
    private static String sql = "";
    private static ResultSet res;


    @RequestMapping("/")
    public String index() {
        return "hello";
    }

    @RequestMapping("/hive")
    public String reviews(@RequestParam(name="sql") String sql) {
        return executeSQL(sql);
    }


    @RequestMapping("/hivee")
    public String reviews() {
        return executeSQL("select * from items");
    }


    private static String executeSQL(String sql) {
        Connection conn = null;
        Statement stmt = null;
        System.out.println(sql);
        try {
            System.out.println("11");
            conn = getConn();
            stmt = conn.createStatement();
            System.out.println("22");

            res = stmt.executeQuery(sql);
            System.out.println("执行 select * query 运行结果:");
            JSONArray jsonArray = org.angularbaby.test.JsonUtil.formatRsToJsonArray(res);

            return jsonArray.toString();

        } catch (ClassNotFoundException e) {
            e.printStackTrace();
            System.out.println("err");
            //System.exit(1);
        } catch (Exception e) {
            e.printStackTrace();
            System.out.println("err");
            //System.exit(1);
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
                System.out.println("AA");
            } catch (SQLException e) {
                e.printStackTrace();
            }
        }
        return "Error";
    }

    private static Connection getConn() throws ClassNotFoundException,
            SQLException {
        System.out.println("33");
        try {
            Class.forName(driverName).newInstance();
        } catch (Exception e) {
            e.printStackTrace();
            System.exit(1);
        }
//        Class.forName(driverName);
        System.out.println("BB");
        Connection conn = DriverManager.getConnection(url, user, password);
        System.out.println("CC");
        return conn;
    }
}