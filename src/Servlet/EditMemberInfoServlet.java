package Servlet;

import javax.servlet.ServletException;
import javax.servlet.annotation.WebServlet;
import javax.servlet.http.HttpServlet;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import Entity.Member;
import Service.MemberService;
import ServiceImpl.MemberServiceImpl;
import com.google.gson.Gson;

import java.io.IOException;
import java.io.PrintWriter;
import java.util.ArrayList;


/**
 * Servlet implementation class MemberAddressServlet
 */
@WebServlet("/EditMemberInfoServlet")
public class EditMemberInfoServlet extends HttpServlet  {

    /**
     * @see HttpServlet#HttpServlet()
     */
    public EditMemberInfoServlet() {
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
        String name,password,phone,email,account,result;
        String[] address;
        String[] Address;
        int id;
        id=Integer.parseInt(request.getParameter("Id"));
        name=request.getParameter("nname");
        password=request.getParameter("npassword");
        phone=request.getParameter("nphone");
        email=request.getParameter("nemail");
        account=request.getParameter("naccount");
        Address=request.getParameterValues("naddress");
        address=request.getParameterValues("oaddress");
        System.out.println("address  "+id);
        MemberService memberservice=new MemberServiceImpl();
        try {
            result=memberservice.EditMemberInfo(id,name,password,phone,email,account);
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
