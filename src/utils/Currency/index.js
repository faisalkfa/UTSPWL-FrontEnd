export function formatRupiah(number) {
  var rupiah = "";
  var numberReversed = number.toString().split("").reverse().join("");
  for (var i = 0; i < numberReversed.length; i++) {
    if (i % 3 === 0) {
      rupiah += numberReversed.substr(i, 3) + ".";
    }
  }
  return (
    "Rp. " +
    rupiah
      .split("", rupiah.length - 1)
      .reverse()
      .join("")
  );
}
