document.getElementById('deliveryForm').addEventListener('submit', (e) => {
    e.preventDefault();
    const hours = parseFloat(document.getElementById('workHours').value) || 0;
    const minutes = parseFloat(document.getElementById('workMinutes').value) || 0;
    const workHours = hours + (minutes / 60); // 時間と分を合計して稼働時間を計算

    // Uber データ
    const uberDeliveries = parseFloat(document.getElementById('uberDeliveries').value) || 0; 
    const uberBaseReward = parseFloat(document.getElementById('uberBaseReward').value) || 0; 
    const uberPromotion = parseFloat(document.getElementById('uberPromotion').value) || 0; 
    const uberTip = parseFloat(document.getElementById('uberTip').value) || 0; 

    // 合計売上
    const totalUberSales = uberBaseReward + uberPromotion + uberTip;

    // 各項目の計算
    const totalSales = totalUberSales;
    const totalDeliveries = uberDeliveries;

    // ゼロ除算防止
    const uberSalesPerHour = workHours > 0 ? totalUberSales / workHours : 0;
    const uberDeliveriesPerHour = workHours > 0 ? uberDeliveries / workHours : 0;
    const uberRewardPerHour = workHours > 0 ? uberBaseReward / workHours : 0;
    const uberSalesPerDelivery = totalDeliveries > 0 ? totalUberSales / uberDeliveries : 0;

    // 結果のフォーマット
    const formatCurrency = (amount) => amount.toLocaleString('ja-JP', { style: 'currency', currency: 'JPY', minimumFractionDigits: 2 });
    const formatDecimal = (number) => {
        if (isNaN(number)) number = 0; 
        const [integerPart, decimalPart] = number.toFixed(2).split('.');
        return `<span class="integer-part">${integerPart}</span>.<span class="decimal-part">${decimalPart}</span>`;
    };

    // 結果を表示
    document.getElementById('results').innerHTML = `
    <h3>分析情報</h3>
    <hr>
    <div class="company-section">
    <h4>基本情報</h4>
    <p>売上: <span class="result-value">${formatDecimal(totalUberSales)}</span>　円</p>
    <p>件数: <span class="result-value">${uberDeliveries}</span>　件</p>

    <h4>報酬内訳</h4>
    <p>正味の料金: <span class="result-value">${formatDecimal(uberBaseReward)}</span>　円</p>
    <p>プロモーション: <span class="result-value">${formatDecimal(uberPromotion)}</span>　円</p>
    <p>チップ: <span class="result-value">${formatDecimal(uberTip)}</span>　円</p>

    <h4>時給</h4>
    <p>正味＋プロモ＋チップ: <span class="result-value">${formatDecimal(uberSalesPerHour)}</span>　円/時</p>
    <p>正味の料金のみ: <span class="result-value">${formatDecimal(uberRewardPerHour)}</span>　円/時</p>

    <h4>単価・ペース</h4>
    <p>配達単価（売上全体）: <span class="result-value">${formatDecimal(uberSalesPerDelivery)}</span>　円/件</p>
    <p>配達ペース: <span class="result-value">${formatDecimal(uberDeliveriesPerHour)}</span>　件/時</p>
    </div>
    `;

    document.getElementById('results').scrollIntoView({
        behavior: 'smooth',
        block: 'start'
    });
});
