package com;

import jakarta.servlet.*;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.Date;
import java.util.Scanner;
import java.io.File;
import jakarta.servlet.ServletException;
import jakarta.servlet.http.HttpServlet;
import jakarta.servlet.http.HttpServletRequest;
import jakarta.servlet.http.HttpServletResponse;

public class CORSFilter extends HttpServlet {

    protected void doGet(HttpServletRequest request,
    HttpServletResponse response) throws ServletException, IOException {
        Date date = new Date();
        response.setContentType("text/html; charset=UTF-8");
        response.setCharacterEncoding("UTF-8");
        PrintWriter out = response.getWriter();
        out.println(read_into_string("index.html"));
        response.setHeader("Cross-Origin-Embedder-Policy", "require-corp");
        response.setHeader("Cross-Origin-Opener-Policy", "same-origin");
    }

    private String read_into_string(String f_name){
        String f_text = "";
        try{
            Scanner s = new Scanner(new File(f_name));
            while(s.hasNextLine()){
                f_text=f_text+s.next()+" ";
            }
        }
        catch (Exception e){
            System.out.println("[CORSFilter] Reading file failure!");
        }
        return f_text;
    }

}