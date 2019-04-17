package Servlet;

import Entity.Discount;
import Service.OrderService;
import ServiceImpl.OrderServiceImpl;
import com.google.gson.Gson;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;

/**
 * Servlet implementation class MemberAddressServlet
 */
@WebServlet("/CancelOrderBeforePayServlet")
public class CancelOrderBeforePayServlet extends HttpServlet {
    /**
     * @see HttpServlet#HttpServlet()
     */
    public CancelOrderBeforePayServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        // TODO Auto-generated method stub
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException {
        response.setContentType("text/html;charset=utf-8");
        request.setCharacterEncoding("UTF-8");
        int orderid=Integer.parseInt(request.getParameter("orderid"));
        System.out.println(orderid);
        String result;
        OrderService orderService=new OrderServiceImpl();
        try {
            result=orderService.Cancelorderbeforepay(orderid);
            PrintWriter write = response.getWriter();
            Gson gson=new Gson();
            String str=gson.toJson(result);
            //System.out.println(str);
            write.write(str); // 将结果返回到前端页
            write.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

