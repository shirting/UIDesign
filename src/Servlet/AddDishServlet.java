package Servlet;

import Service.DiscountService;
import Service.DishService;
import Service.RestaurantService;
import ServiceImpl.DiscountServiceImpl;
import ServiceImpl.DishServiceImpl;
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
@WebServlet("/AddDishServlet")
public class AddDishServlet extends HttpServlet {
    /**
     * @see HttpServlet#HttpServlet()
     */
    public AddDishServlet() {
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
        boolean add=false;
        String Name=request.getParameter("name");
        String DishInfo=request.getParameter("Dishinfo");
        double DishPrice=Double.parseDouble(request.getParameter("price"));
        String chaptcha=request.getParameter("chaptcha");
        int DishAmount=Integer.parseInt(request.getParameter("DishAmount"));
        String StartTime=request.getParameter("startTime");
        String EndTime=request.getParameter("endTime");
        DishService dishService=new DishServiceImpl();
        try {
            add=dishService.AddDish(Name,DishInfo,chaptcha,DishPrice,DishAmount,StartTime,EndTime);
            PrintWriter write = response.getWriter();
            Gson gson=new Gson();
            String str=gson.toJson(add);
            //System.out.println(str);
            write.write(str); // 将结果返回到前端页
            write.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

