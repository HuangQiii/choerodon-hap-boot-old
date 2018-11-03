# choerodon-hap-boot-old

### 本地开发core模块
- 克隆代码
- 进入工作目录（即hap-core中react目录下）：cd hap-core/src/main/webapp/WEB-INF/view/react
- 在该目录下安装依赖： npm install
- 将该目录的npm命令link到全局方便修改测试： npm link
- 启动项目开发开发： npm run core

*注：可以根据自己需要改写./src/AutoRouter.js中的路由信息。
需本地测试时要启动后端并且修改配置项指向 localhost:8080（暂未提供配置项设置）*

### 完成core模块后发布

将代码提交即会自动触发CI，执行如下步骤（！无需手动完成！）：

- 进入工作目录（即hap-core中react目录下）：cd hap-core/src/main/webapp/WEB-INF/view/react
- 安装必须的依赖： npm install
- npm link
- npm run dist生成打包后的bundle文件，dist目录在 hap-core/src/main/webapp/lib 下

### 本地开发其他模块（依赖于core）【第一次】
- 运行mvn插件，从jar包中获得react相关部分代码

*注：在pom文件中添加如下插件*
```
<plugin>
    <groupId>com.hand.hap</groupId>
    <artifactId>hap-front-plugin</artifactId>
    <version>1.0-SNAPSHOT</version>
    <executions>
        <execution>
            <phase>generate-sources</phase>
            <goals>
                <!--复制本项目react代码到classes -->
                <goal>copy</goal>
                <!--提取依赖模块的react代码到target下-->
                <goal>extract</goal>
            </goals>
        </execution>
    </executions>
</plugin>
```
- 按约定创建修改目录（目录模板在下）
- 进入自己模块的react目录，运行 cd ../../../../../../target/generate-react
- 键入 cd hap-core，按Tab键补全版本号，进入该目录
- 在该目录下运行： npm install
- npm link
- npm run dev

*注：目录形式如下，main为当前模块名，请替换成自己的模块！*

### 本地开发其他模块（依赖于core）【非第一次】
- 进入自己模块的react目录，运行 cd ../../../../../../target/generate-react
- 键入 cd hap-core，按Tab键补全版本号，进入该目录
- npm run dev

*注：可以通过查看generate-react文件夹下的文件夹命名来确认是否要运行mvn插件进行依赖更新。
文件夹名为hap-core-4.0-SNAPSHOT，后两段为版本信息。*

### 完成其他模块（依赖于core）发布
- 进入自己模块的react目录，运行 cd ../../../../../../target/generate-react
- 键入 cd hap-core，按Tab键补全版本号，进入该目录
- npm run build

*注：确认替换index.html*
