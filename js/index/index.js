import { createClient } from "https://cdn.jsdelivr.net/npm/@supabase/supabase-js@2/+esm";

document.addEventListener('DOMContentLoaded', async () => {
    const supabaseUrl = "https://lysuqcspfpugxozttfek.supabase.co";
    const supabaseKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Imx5c3VxY3NwZnB1Z3hvenR0ZmVrIiwicm9sZSI6ImFub24iLCJpYXQiOjE3MzQxMjM3NTYsImV4cCI6MjA0OTY5OTc1Nn0.LFafqHaLxS5r3yynw8EydY0VjGlVI7jwr7cr4ovg7P4";

    // 创建 Supabase 客户端
    const supabase = createClient(supabaseUrl, supabaseKey);

    // 示例：从数据库获取数据
    async function fetchData() {
        try {
            const { data, error } = await supabase
                .from("Breaking News") // 替换为你的表名
                .select("*");
            if (error) {
                console.error("查询数据出错:", error);
            } else {
                return data;
            }
        } catch (err) {
            console.error("请求失败:", err);
        }
    }

    // 调用 fetchData 函数并将数据插入页面
    const data = await fetchData();

    // 获取容器元素
    const newsContainer = document.getElementById("news-container");

    // 检查是否有数据
    if (data && data.length > 0) {
        data.forEach(item => {
            // 创建新闻项
            const newsItem = document.createElement("div");
            newsItem.classList.add("news-item");

            // 创建标题
            const title = document.createElement("h3");
            title.textContent = item.title; // 使用从数据库查询到的标题
            newsItem.appendChild(title);

            // 创建内容
            const content = document.createElement("p");
            // 使用 DOMPurify 清理 HTML 内容，确保其安全
            content.innerHTML = DOMPurify.sanitize(item.text); // 使用全局的 DOMPurify.sanitize
            newsItem.appendChild(content);

            // 创建时间
            const time = document.createElement("p");
            time.classList.add("time"); // 给时间添加类名，方便 CSS 样式定制
            time.textContent = `创建时间: ${new Date(item.created_at).toLocaleString()}`; // 格式化时间
            newsItem.appendChild(time);

            // 将新闻项添加到新闻容器中
            newsContainer.appendChild(newsItem);
        });
    } else {
        newsContainer.innerHTML = "<p>没有新闻可显示。</p>";
    }
});
