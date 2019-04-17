package Entity;

public class Yummy {
    //账号、账号密码
    private String yummyname;
    private String yummypassword;
    private int yummyId;

    public int getYummyId() {
        return yummyId;
    }

    public String getYummyname() {
        return yummyname;
    }

    public String getYummypassword() {
        return yummypassword;
    }

    public void setYummyId(int yummyId) {
        this.yummyId = yummyId;
    }

    public void setYummyname(String yummyname) {
        this.yummyname = yummyname;
    }

    public void setYummypassword(String yummypassword) {
        this.yummypassword = yummypassword;
    }
}
