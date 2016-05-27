package com.example.mytestapp;

import android.content.Context;
import android.graphics.Point;
import android.util.Log;
import android.widget.Toast;

/**
 * Created by yanghaibo on 16/5/18.
 */
public class T5T {
    int xMax = 16;
    private int[][] arr = new int[26][26];
    private Context context;

    public T5T(Context context){
        this.context = context;
    }

    public int[][] getArr(){
        return this.arr;
    }

    public void gameready(){
        for(int i = 0;i<arr.length;i++){
            int[] ar = arr[i];
            for(int j = 0;j<ar.length;j++){
                ar[j] = 0;
            }
        }
    }

    public void shw(int x,int y,int tkey){
        arr[x][y] = tkey;
        for(int j = 5;j >= 0;j--){
            int xyz = 0;

            int tminy = y - j;
            if (tminy<0){
                continue;
            }
            int tminx = x - j;
            if (tminx<0){
                continue;
            }
            int tmaxx = x + j;
            int tmaxy = y + j;



            //竖着
            for(int i = 0;i < 5;i++){
                int ty = tminy + i;
                int val = arr[x][ty];
                xyz = xyz + val;
            }
            if(testsize(xyz)){
                c();
                //console.log("aaaaa");
                return;
            }else{
                xyz = 0;
            }
            //横着
            for(int i = 0;i < 5;i++){
                int tx = tminx + i;
                int val = arr[tx][y];
                xyz = xyz + val;
            }
            if(testsize(xyz)){
                c();
                //console.log("aaaaa")
                return;
            }else{
                xyz = 0;
            }
            //正弦
            for(int i = 0;i < 5;i++){
                int ty = tminy + i;
                int tx = tminx + i;
                int val = arr[tx][ty];
                xyz = xyz + val;
            }
            if(testsize(xyz)){
                c();
                //console.log("aaaaa")
                return;
            }else{
                xyz = 0;
            }
            //
            for(int i = 0;i < 5;i++){
                int ty = tmaxy - i;
                int tx = tminx + i;
                if(ty>=0) {
                    int val = arr[tx][ty];
                    xyz = xyz + val;
                }
            }
            if (testsize(xyz)){
                c();
                //console.log("aaaaa")
                return;
            }
            else{
                xyz = 0;
            }
        }
    }

    private void c(){
        Log.e("zzzz","ccccccc");
        Toast.makeText(context,"胜负已分",Toast.LENGTH_LONG).show();
    }

    private boolean testsize(int xyz){
        if(xyz==5||xyz==-5){
            return true;
        }
        return false;
    }

    /*
    成5, 100分
    活4、双死4、死4活3， 90分
    双活3， 80分
    死3活3， 70分
    死4， 60分
    活3， 50分
    双活2， 40分
    死3， 30分
    活2， 20分
    死2， 10分
    单子 0分
    */
    private void stst(int zzz){
        int[][] pointarr = new int[26][26];
        for(int i = 0;i<pointarr.length;i++){
            int[] ar = pointarr[i];
            for(int j = 0;j<ar.length;j++){
                ar[j] = 0;
            }
        }

        for(int i = 0;i < arr.length;i++){
            int[] ar = arr[i];
            for(int j = 0;j < ar.length;j++){
                int z = ar[j];
                if (z == 0){
                    boolean isfive = isfive(i,j,zzz);


                }
            }
        }

    }

    private int getsocre(int x,int y){
        int score = 0;



        return  score;
    }

    public enum Direction{
        transverse ,
        vertical ,
        upoblique,
        downoblique ,
    }

    class SPoint{
        public int x;
        public int y;
        public int z;
        public SPoint(int x,int y){
            this.x = x;
            this.y = y;
            z = 0;
        }
        public void SZ(int z){
            this.z = z;
        }
    }

    private int theshu(int x,int y,int z){
        int t = 0;
        SPoint sp = new SPoint(x,y);
        SPoint n1 = new SPoint(x,y + 1);
        SPoint s1 = new SPoint(x,y - 1);
        SPoint w1 = new SPoint(x - 1,y);
        SPoint e1 = new SPoint(x + 1,y);
        SPoint nw1 = new SPoint(x - 1,y - 1);
        SPoint ne1 = new SPoint(x + 1,y - 1);
        SPoint se1 = new SPoint(x + 1,y + 1);
        SPoint sw1 = new SPoint(x - 1,y + 1);

        SPoint n2 = new SPoint(x,y + 2);
        SPoint s2 = new SPoint(x,y - 2);
        SPoint w2 = new SPoint(x - 2,y);
        SPoint e2 = new SPoint(x + 2,y);
        SPoint nw2 = new SPoint(x - 2,y - 2);
        SPoint ne2 = new SPoint(x + 2,y - 2);
        SPoint se2 = new SPoint(x + 2,y + 2);
        SPoint sw2 = new SPoint(x - 2,y + 2);

        SPoint n3 = new SPoint(x,y + 3);
        SPoint s3 = new SPoint(x,y - 3);
        SPoint w3 = new SPoint(x - 3,y);
        SPoint e3 = new SPoint(x + 3,y);
        SPoint nw3 = new SPoint(x - 3,y - 3);
        SPoint ne3 = new SPoint(x + 3,y - 3);
        SPoint se3 = new SPoint(x + 3,y + 3);
        SPoint sw3 = new SPoint(x - 3,y + 3);

        SPoint n4 = new SPoint(x,y + 4);
        SPoint s4 = new SPoint(x,y - 4);
        SPoint w4 = new SPoint(x - 4,y);
        SPoint e4 = new SPoint(x + 4,y);
        SPoint nw4 = new SPoint(x - 4,y - 4);
        SPoint ne4 = new SPoint(x + 4,y - 4);
        SPoint se4 = new SPoint(x + 4,y + 4);
        SPoint sw4 = new SPoint(x - 4,y + 4);
        //横竖上斜下斜
        int psn1 = ps(n1,z);int pss1 = ps(s1,z);
        int psw1 = ps(w1,z);int pse1 = ps(e1,z);
        int psnw1 = ps(nw1,z);int psne1 = ps(ne1,z);
        int psse1 = ps(se1,z);int pssw1 = ps(sw1,z);

        int psn2 = ps(n2,z);int pss2 = ps(s2,z);
        int psw2 = ps(w2,z);int pse2 = ps(e2,z);
        int psnw2 = ps(nw2,z);int psne2 = ps(ne2,z);
        int psse2 = ps(se2,z);int pssw2 = ps(sw2,z);

        int psn3 = ps(n3,z);int pss3 = ps(s3,z);
        int psw3 = ps(w3,z);int pse3 = ps(e3,z);
        int psnw3 = ps(nw3,z);int psne3 = ps(ne3,z);
        int psse3 = ps(se3,z);int pssw3 = ps(sw3,z);

        int psn4 = ps(n4,z);int pss4 = ps(s4,z);
        int psw4 = ps(w4,z);int pse4 = ps(e4,z);
        int psnw4 = ps(nw4,z);int psne4 = ps(ne4,z);
        int psse4 = ps(se4,z);int pssw4 = ps(sw4,z);

        Direction d = Direction.transverse;




        return t;
    }

    private int xaz(SPoint sp1,int z, Direction d){
        int a = 0;
        switch (d){
            case transverse:{
                int spw1 = ps(new SPoint(sp1.x - 1,sp1.y),z);
                int spe1 = ps(new SPoint(sp1.x + 1,sp1.y),z);
                int spw2 = ps(new SPoint(sp1.x - 2,sp1.y),z);
                int spe2 = ps(new SPoint(sp1.x + 2,sp1.y),z);
                int spw3 = ps(new SPoint(sp1.x - 3,sp1.y),z);
                int spe3 = ps(new SPoint(sp1.x + 3,sp1.y),z);
                int spw4 = ps(new SPoint(sp1.x - 4,sp1.y),z);
                int spe4 = ps(new SPoint(sp1.x + 4,sp1.y),z);

                if (spw1 == 1){
                    if (spw2 == 1){
                        if (spw3 == 1){
                            if(spw4 == 1){
                                a = 100;
                            }else if (spw4 == 0){
                                if (spe1 == -1){
                                    a = 60;
                                }else{
                                    a = 100;
                                }
                            }else{
                                if (spe1 == 1){
                                    a = 100;
                                }else if (spe1 == 0){
                                    a = 60;
                                }else{
                                    a = 0;
                                }
                            }
                        }else if(spw3 == 0){
                            if (spe1 == 1){
                                if (spe2 == -1){
                                    a = 60;
                                }else {
                                    a = 100;
                                }
                            }
                            else if(spe1 == 0){
                                a = 50;
                            }
                            else{
                                a = 30;
                            }
                        }else{
                            if (spe1 == 1){
                                if (spe2 ==1){
                                    a = 100;
                                }else if (spe2 == 0){
                                    a = 60;
                                }else{
                                    a = 0;
                                }
                            }else if(spe1 == 0){
                                a = 30;
                            }else{
                                a = 0;
                            }
                        }
                    }else if(spw2 == 0){
                        if (spe1 == 1){

                        }else if(spe1 == 0){

                        }else{

                        }
                    }else {

                    }
                }else if(spw1 == 0){

                }else{

                }



















                if (spw1 < 1){//left empty
                    if (spe1 == 0){}//all empty
                    else if (spe1 == 1){
                        if (spe2 == 1){
                            if (spe3 == 1){

                                if (spe4 == 1){
                                    a = 100;
                                }else if(spe4 == 0){
                                    a = 90;
                                }else{
                                    a = 60;
                                }
                            }else if (spe3 == 0){
                                a = 50;
                            }else{
                                a = 30;
                            }
                        }else if (spe2 == 0){
                            a = 20;
                        }else{
                            a = 10;
                        }
                    }
                }else{

                    if (spw2 == 1){
                        if (spe2 == 1){
                            a = 100;
                        }else if (spe2 == 0){
                            if (spw3 == 1){
                                a = 100;
                            }else if (spw3 == 0){
                                a = 90;
                            }
                            else{
                                a = 60;
                            }
                        }else{
                            if (spw3 == 1){
                                a = 100;
                            }else if(spw3 == 0){
                                a = 60;
                            }
                        }
                    }else if (spw2==0){
                        if (spe2 == 1){
                            if (spw3 == 1){
                                if (spe3 == 1){

                                }else if(spe3 == 0){

                                }else{

                                }
                            }else if(spw3 == 0){

                            }else{

                            }
                        }else if (spe2 == 0){

                        }else{

                        }
                    }
                    else{

                    }
                }
            }
                break;
            case vertical:{


            }
                break;
            case upoblique:{

            }
                break;
            case downoblique:{

            }
                break;
        }


        return a;
    }


    private int ps(SPoint n,int z){
        int socre = 0;

        if (n.x <0 || n.y < 0){
            return -1;
        }

        if (n.x > 20 || n.y > 20){
            return  -1;
        }

        int n1z = arr[n.x][n.y];
        if (n1z == z){
            socre = 1;
        }else if (n1z == 0){
            socre = 0;
        }else{
            socre = -1;
        }
        return socre;
    }



    private boolean isfive(int x,int y,int zzz){
        boolean isfive = false;


        return isfive;
    }

    private boolean isfour(){
        boolean isfour = false;


        return isfour;
    }



}
