package Entity;
import java.sql.Date;
//店铺编码、满A减B
public class Discount {
    private String Chaptcha;
    private int Full;
    private int Minus;
    private String Result;
    private String StartTime;
    private String EndTime;

    public void setChaptcha(String chaptcha) {
        Chaptcha = chaptcha;
    }

    public void setFull(int full) {
        Full = full;
    }

    public void setMinus(int minus) {
        Minus = minus;
    }

    public void setResult(String result) {
        Result = result;
    }

    public void setStartTime(String startTime) {
        StartTime = startTime;
    }

    public void setEndTime(String endTime) {
        EndTime = endTime;
    }

    public String getStartTime() {
        return StartTime;
    }

    public String getEndTime() {
        return EndTime;
    }

    public String getResult() {
        return Result;
    }

    public int getMinus() {
        return Minus;
    }

    public int getFull() {
        return Full;
    }

    public String getChaptcha() {
        return Chaptcha;
    }
}
