package com.example.mytestapp;

import android.graphics.Canvas;
import android.graphics.Color;
import android.graphics.Paint;
import android.support.v7.app.AppCompatActivity;
import android.os.Bundle;
import android.content.Context;
import android.util.Log;
import android.view.MotionEvent;
import android.view.SurfaceHolder;
import android.view.SurfaceView;
import android.view.View;

public class MainActivity extends AppCompatActivity implements View.OnTouchListener,SurfaceHolder.Callback,View.OnClickListener {

    private Context context;
    private T5T t5t;
    private View txt;
    private SurfaceView surfaceView;
    private SurfaceHolder sfh;

    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        context = this;
        t5t = new T5T(context);
        txt = findViewById(R.id.txt);
        surfaceView = (SurfaceView)findViewById(R.id.surfaceView);
        surfaceView.setOnTouchListener(this);
        sfh = surfaceView.getHolder();
        sfh.addCallback(this);
        txt.setOnClickListener(this);
    }




    private int height;
    private int width;
    private boolean isfirst = true;

    private void drawonehasline(int lx,int ly,int xxx){
        height = surfaceView.getHeight();
        width = surfaceView.getWidth();
        int lw = width / 16;
        int lh = height / 16;
        Canvas canvas = sfh.lockCanvas();
        canvas.drawColor(Color.WHITE);

        Paint p = new Paint();
        p.setColor(Color.BLUE);
        float[] f = new float[16];
        for(int i = 0;i<16;i++){
            f[i] = i*lw + 1;
            int a = i * lw + 1;
            int b = i * lw + 2;
            int c = i * lh + 1;
            int d = i * lh + 2;
            canvas.drawLine(a,0,b,height,p);
            canvas.drawLine(0,c,width,d,p);
        }

        int[][] arr = t5t.getArr();
        for(int i = 0;i<arr.length;i++){
            int[] ar = arr[i];
            for(int j=0;j< ar.length;j++){
                int x = ar[j];
                if(x==1){
                    Paint p1 = new Paint();
                    int xw = i * lw;
                    int xh = j * lh;
                    p1.setColor(Color.RED);
                    canvas.drawCircle(xw,xh,12,p1);
                }
                else if (x==-1){
                    Paint p1 = new Paint();
                    int xw = i * lw;
                    int xh = j * lh;
                    p1.setColor(Color.GREEN);
                    canvas.drawCircle(xw,xh,12,p1);
                }
            }
        }

        Paint p1 = new Paint();
        if (xxx == 1){
            p1.setColor(Color.RED);
        }else if (xxx == -1){
            p1.setColor(Color.GREEN);
        }

        p1.setStrokeWidth(4);
        int a = lx * lw ;
        int b = lx * lw + 4;
        int c = ly * lh ;
        int d = ly * lh + 4;
        canvas.drawLine(a,0,a,height,p1);
        canvas.drawLine(0,c,width,c,p1);


        sfh.unlockCanvasAndPost(canvas);
    }

    private void drawlines(){
        height = surfaceView.getHeight();
        width = surfaceView.getWidth();
        int lw = width / 16;
        int lh = height / 16;
        Canvas canvas = sfh.lockCanvas();
        canvas.drawColor(Color.WHITE);
        Paint p = new Paint();
        p.setColor(Color.BLUE);
        float[] f = new float[16];
        for(int i = 0;i<16;i++){
            f[i] = i*lw + 1;
            int a = i * lw + 1;
            int b = i * lw + 2;
            int c = i * lh + 1;
            int d = i * lh + 2;
            canvas.drawLine(a,0,b,height,p);
            canvas.drawLine(0,c,width,d,p);
        }
        //canvas.drawLine();
        //canvas.drawLines(f,p);
        //canvas.drawLines(f,p);
        int[][] arr = t5t.getArr();
        for(int i = 0;i<arr.length;i++){
            int[] ar = arr[i];
            for(int j=0;j< ar.length;j++){
                int x = ar[j];
                if(x==1){
                    Paint p1 = new Paint();
                    int xw = i * lw;
                    int xh = j * lh;
                    p1.setColor(Color.RED);
                    canvas.drawCircle(xw,xh,12,p1);
                }
                else if (x==-1){
                    Paint p1 = new Paint();
                    int xw = i * lw;
                    int xh = j * lh;
                    p1.setColor(Color.GREEN);
                    canvas.drawCircle(xw,xh,12,p1);
                }
            }
        }
        sfh.unlockCanvasAndPost(canvas);
    }

    @Override
    public void onWindowFocusChanged(boolean hasFocus){
        super.onWindowFocusChanged(hasFocus);
        if (isfirst) {
            isfirst = false;
            drawlines();
        }
    }
    

    @Override
    public boolean onTouch(View view, MotionEvent motionEvent) {
        float x = motionEvent.getX();
        float y = motionEvent.getY();
        int action = motionEvent.getAction();
        switch (action){
            case MotionEvent.ACTION_DOWN:
                //Log.e("aaaaa",x+"|"+y);
                drawhasline(x,y);
                break;
            case MotionEvent.ACTION_UP:
                drawpc(x,y);
                //Log.e("aaaaa",x+"|"+y);
                break;
            case MotionEvent.ACTION_MOVE:
                //
                drawhasline(x,y);
                break;
        }


        return true;
    }

    boolean isturn = false;

    private void drawhasline(float x,float y){
        int lw = width / 16;
        int lh = height / 16;
        int w = (int)(x / lw);
        int h = (int)(y / lh);
        int xxx = 1;
        if(isturn){
            xxx = -1;
        }
        //drawlines();
        drawonehasline(w,h,xxx);
    }

    private void drawpc(float x,float y){
        int lw = width / 16;
        int lh = height / 16;
        int w = (int)(x / lw);
        int h = (int)(y / lh);
        int z = t5t.getArr()[w][h];
        if(z == 0) {
            int xxx = 1;
            if(isturn){
                xxx = -1;
            }
            isturn = !isturn;
            //arr[x][y] = tkey;
            t5t.shw(w, h, xxx);
            drawlines();
        }
    }


    @Override
    public void surfaceCreated(SurfaceHolder surfaceHolder) {

    }

    @Override
    public void surfaceChanged(SurfaceHolder surfaceHolder, int i, int i1, int i2) {

    }

    @Override
    public void surfaceDestroyed(SurfaceHolder surfaceHolder) {

    }

    @Override
    public void onClick(View view) {
        switch (view.getId()){
            case R.id.txt:
                t5t.gameready();
                drawlines();
                break;
        }
    }
}
