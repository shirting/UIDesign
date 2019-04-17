package Servlet;

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

/**
 * Servlet implementation class Login
 */
@WebServlet("/OrderArrivedServlet")
public class OrderArrivedServlet extends HttpServlet {
    private static final long serialVersionUID = 1L;

    /**
     * @see HttpServlet#HttpServlet()
     */
    public OrderArrivedServlet() {
        super();
        // TODO Auto-generated constructor stub
    }

    /**
     * @see HttpServlet#doGet(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doGet(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        // TODO Auto-generated method stub
/*		ServletContext Context= getServletContext();
		int webCounter= Integer.parseInt((String) Context.getAttribute("webCounter"));
		if (null == request.getParameter("Logout")) {
			System.out.println("pageCounter++\n");
			webCounter++;
			Context.setAttribute("webCounter", Integer.toString(webCounter));
		}*/
    }

    /**
     * @see HttpServlet#doPost(HttpServletRequest request, HttpServletResponse response)
     */
    protected void doPost(HttpServletRequest request, HttpServletResponse response) throws ServletException, IOException
    {
        response.setContentType("text/html;charset=utf-8");
        request.setCharacterEncoding("UTF-8");
        int orderid=Integer.parseInt(request.getParameter("orderid"));
        String result;
        System.out.println(orderid);
        //System.out.println(discount);
        //System.out.println(chaptcha);
        //System.out.println(memberid);
        OrderService orderService=new OrderServiceImpl();
        try {
            result = orderService.OrderArrived(orderid);
            //System.out.println(member);
            PrintWriter write = response.getWriter();
            Gson gson=new Gson();
            String str=gson.toJson(result);
            System.out.println(str);
            write.write(str); // 将结果返回到前端页
            write.close();
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}

