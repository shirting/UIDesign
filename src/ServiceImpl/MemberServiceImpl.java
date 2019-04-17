package ServiceImpl;

import Entity.Member;
import Service.MemberService;
import Dao.MemberDao;
import DaoImpl.MemberDaoImpl;

import java.util.ArrayList;

public class MemberServiceImpl implements MemberService {
    MemberDao memberdao=new MemberDaoImpl();
    @Override
    public Member GetMemberAddress(String name, int id) throws Exception {
        return memberdao.getMemberAddress(name,id);
    }

    @Override
    public String EditMemberInfo(int id,String name, String password, String phone, String email, String account) throws Exception {
        return memberdao.editMemberInfo(id,name, password,  phone,  email,  account);
    }

    @Override
    public String EditMemberAddress(int id, String name, String[] Address) throws Exception {
        return memberdao.editMemberAddress(id,name,Address);
    }

    @Override
    public String DeleteMember(int id, String name) throws Exception {
        return memberdao.DeleteMember(id,name);
    }

    @Override
    public Member getmemberinfo(int id) throws Exception {
        return memberdao.getmemberinfo(id);
    }

    @Override
    public ArrayList<Member> GetMemberInfo() throws Exception {
        return memberdao.GetMemberInfo();
    }
}
