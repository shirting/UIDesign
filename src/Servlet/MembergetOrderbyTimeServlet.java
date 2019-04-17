package Servlet;

import Entity.Order;
import Service.OrderService;
import Service.RestaurantService;
import ServiceImpl.OrderServiceImpl;
import ServiceImpl.RestaurantServiceImpl;
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
@WebServlet("/MembergetOrderbyTimeServlet")
public class MembergetOrderbyTimeServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public MembergetOrderbyTimeServlet() {
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
        int MemberID=Integer.parseInt(request.getParameter("MemberID"));
        String MemberName=request.getParameter("MemberName");
        OrderService orderService=new OrderServiceImpl();
        ArrayList<Order> orderArrayList=new ArrayList<Order>();
        try {
            orderArrayList =orderService.MembergetOrderbyTime(MemberName,MemberID);
            PrintWriter write = response.getWriter();
            Gson gson=new Gson();
            String str=gson.toJson(orderArrayList);
            write.write(str); // 将结果返回到前端页
            write.close();
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}


