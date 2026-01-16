document.addEventListener("DOMContentLoaded", () => {

    function showStep(stepId) {
        document.querySelectorAll(".cf-step").forEach(s => s.classList.remove("active"));
        document.getElementById(stepId).classList.add("active");
    }

    // Navegación general
    document.querySelectorAll("[data-next]").forEach(btn => {
        btn.addEventListener("click", () => {
            if (!btn.classList.contains("disabled")) {
                showStep(btn.dataset.next);
            }
        });
    });

    document.querySelectorAll("[data-back]").forEach(btn => {
        btn.addEventListener("click", () => showStep(btn.dataset.back));
    });

    // VALIDACIÓN DIRECCIÓN
    const origenInput = document.getElementById("origen-input");
    const origenNext = document.getElementById("origen-next");

    origenInput.addEventListener("input", () => {
        origenNext.classList.toggle("disabled", origenInput.value.trim().length < 3);
    });

    // VALIDACIÓN FECHA
    const fechaInput = document.getElementById("fecha-input");
    const fechaNext = document.getElementById("fecha-next");

    fechaInput.addEventListener("input", () => {
        fechaNext.classList.remove("disabled");
    });

    // VALIDACIÓN ESTACIONAMIENTO ORIGEN
    document.querySelectorAll("input[name='est-origen']").forEach(r => {
        r.addEventListener("change", () => {
            document.getElementById("estacion-origen-next").classList.remove("disabled");
        });
    });

    // VALIDACIÓN ESTACIONAMIENTO DESTINO
    document.querySelectorAll("input[name='est-destino']").forEach(r => {
        r.addEventListener("change", () => {
            document.getElementById("estacion-destino-next").classList.remove("disabled");
        });
    });

    // ---------- FRAME DE ÍTEMS ----------
    document.querySelectorAll(".cat-header").forEach(header => {
        header.addEventListener("click", () => {
            header.nextElementSibling.classList.toggle("active");
        });
    });

    const totalVolEl = document.getElementById("total-vol");
    const totalItemsEl = document.getElementById("total-items");
    const itemsNextBtn = document.getElementById("items-next");

    let totalVolume = 0;
    let totalItems = 0;

    function updateTotals() {
        totalVolEl.textContent = totalVolume.toFixed(2);
        totalItemsEl.textContent = totalItems;

        itemsNextBtn.classList.toggle("disabled", totalItems === 0);
    }

    document.querySelectorAll(".item-row").forEach(row => {
        const plus = row.querySelector(".plus");
        const minus = row.querySelector(".minus");
        const qtySpan = row.querySelector(".qty");
        const volume = Number(row.dataset.volume);

        plus.addEventListener("click", () => {
            let qty = Number(qtySpan.textContent);
            qty++;
            qtySpan.textContent = qty;

            totalItems++;
            totalVolume += volume;
            updateTotals();
        });

        minus.addEventListener("click", () => {
            let qty = Number(qtySpan.textContent);
            if (qty > 0) {
                qty--;
                qtySpan.textContent = qty;

                totalItems--;
                totalVolume -= volume;
                updateTotals();
            }
        });
    });

    // ---------- VALIDACIÓN CONTACTO ----------
    const email = document.getElementById("email-input");
    const phone = document.getElementById("phone-input");
    const check = document.getElementById("acepto-check");
    const finalNext = document.getElementById("final-next");

    function validateFinal() {
        const ok = email.value.includes("@") && phone.value.trim().length >= 7 && check.checked;
        finalNext.classList.toggle("disabled", !ok);
    }

    email.addEventListener("input", validateFinal);
    phone.addEventListener("input", validateFinal);
    check.addEventListener("change", validateFinal);

});
