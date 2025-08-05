## 说几个工作中常用的Linux命令？
cd：切换目录  
ls：查看文件列表  
cp：拷贝文件  
mv：移动文件  
rm：删除文件  
chmod：设置文件权限  
cat：浏览文件内容  
vi：文件编辑  
grep：过滤文件内容  

## 你在工作中哪些场景中用到Linux
1、当项目不能访问时，登录到Linux服务器上看看项目是否启动（ps -ef | grep xxx）  
2、当测试出现bug时，登录到Linux服务器上看看是否有错误日志（grep “ERROR” xxx.log）  
3、有时会做下项目的部署，把开发打好的项目包，上传到tomcat里，然后修改项目配置文件，启动tomcat  

##  在Linux中如何杀死一个进程？
先用ps命令查看进程号，比如tomcat，查看tomcat的PID命令如下所示：  
ps -ef|grep tomcat  
找到进程id后，用kill命令杀死进程：kill -9 12345

##  如何查找文件
在根目录下查找名称为a.log的文件：find / -name a.log  
在当前目录下查找大于10k的文件：find . -type f -size +10k

##  在Linux中如何查找日志文件中的Error信息
查看包含Error的日志：grep "Error" test.log  
查看包含Error的日志以及它的后10行：grep -A 10 "Error" test.log

##  如何给一个文件添加可执行权限
chmod 777 test.log  
chmod +x test.log

##  如何判断一个端口是否被占用
netstat -anp | grep 端口号，这个命令可以查出占用端口号的进程号，通过kill -9 进程号 就能把对应进程杀掉
 
##  说说docker常用命令  
1、先说一下之前自己在工作中接触docker这个主要用来干什么  
2、介绍在工作中常用到的一些命令，比如与环境部署相关会用到docker pull/ build / exec/ rm /rmi /logs 等 ，按照自己所了解的进行介绍，要注意要知道每个命令在工作中哪些场景会用到，不要光死记硬背命令。
  



## others
1.linux监控操作系统的常用命令，查看JVM的命令  
2.linux三剑客说一下有什么区别，应用场景是什么？  
3.查找大于1M的文件linux命令  
4.linux查找当前目录下所有后缀为.py的文件  
5.shell学过吗？都会哪些东西？说一下应用场景？  
  