const text = document.getElementById("text")
        const yy = document.getElementById("yy")
        const button = document.getElementById("button")
        const load = document.getElementById("load")

        text.textContent = "申请权限中..."

        button.addEventListener("click", function () {

            text.classList.remove("notshow")
            load.classList.remove("notshow")
            button.classList.add("notshow")

            async function handleNotificationRequest() {
                const load = document.querySelector(".loader"); // 假设 loader 是加载动画的类
                const text = document.getElementById("text");

                if (Notification.permission === "granted") {
                    load.classList.add("notshow");
                    text.textContent = "验证成功！你会在三秒中后重定向！";
                    text.style.color = "green";
                    setTimeout(() => {
                        window.location.href = "https://bilibili.com";
                    }, 3000); // 3000 毫秒（即 3 秒）

                    // 如果需要隐藏其他元素可以启用下面代码
                    // yy.classList.add("yy");
                } else if (Notification.permission !== "denied") {
                    text.textContent = "请同意获取权限";
                    // 如果需要隐藏其他元素可以启用下面代码
                    // yy.classList.add("yy");

                    const permission = await Notification.requestPermission();

                    if (permission === "granted") {
                        new Notification("Hello, world!");
                        load.classList.add("notshow");
                        text.textContent = "验证成功！你会在三秒中后重定向！";
                        text.style.color = "green";
                        setTimeout(() => {
                        window.location.href = "https://bilibili.com";
                    }, 3000); // 3000 毫秒（即 3 秒）

                    } else if (Notification.permission === "denied") {
                        load.classList.add("notshow");
                        text.textContent = "请手动同意通知权限并刷新页面！";
                        text.style.color = "red";
                    } else {
                        load.classList.add("notshow");
                        text.textContent = "请刷新页面！";
                        text.style.color = "red";
                    }
                } else if (Notification.permission === "denied") {
                    load.classList.add("notshow");
                    text.textContent = "请手动同意通知权限并刷新页面！";
                    text.style.color = "red";
                } else {
                    load.classList.add("notshow");
                    text.textContent = "请刷新页面！";
                    text.style.color = "red";
                }
            }

            // 调用函数
            handleNotificationRequest();

        })
