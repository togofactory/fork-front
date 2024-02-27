document.addEventListener('DOMContentLoaded', init);
<script src="https://ads-partners.coupang.com/g.js"></script>
<script>
	new PartnersCoupang.G({"id":761181,"template":"carousel","trackingCode":"AF9322015","width":"680","height":"140","tsource":""});
</script>
function init() {
  const inputText = document.getElementById('inputText');
  const sendMessageButton = document.getElementById('sendMessage');
  sendMessageButton.addEventListener('click', () => {
    const userMessage = inputText.value.trim();
    if (userMessage === '') {
      return;
    }
    // 팝업 창 표시
    Swal.fire({
      title: "🤔분석중..",
      html: "잠시 기다려 주세요...",
      allowOutsideClick: false,
      allowEscapeKey: false,
      showConfirmButton: false,
      didOpen: () => {
        Swal.showLoading();
      },
      customClass: {
        popup: 'custom-popup-class'
      }
    });
    getCode(userMessage)
  });
};

async function getCode(questCode) {
  const Url = `https://port-0-giftserver-9zxht12blq81t0ot.sel4.cloudtype.app/generate`;
  // const Url = `https://port-0-fork-back-17xco2nlt1m4ugh.sel5.cloudtype.app/generate`;
  const Data = JSON.stringify({ userInput: questCode });   
  let response; 
    try {
      response = await fetch(Url, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: Data
      });
      if (!response.ok) throw new Error('Network response was not ok.'); 
    } catch (error) { 
        Swal.fire({
          title: '에러',
          text: '분석 중 에러가 발생했습니다!',
          icon: 'error',
          confirmButtonText: '닫기'
        });
        return;  
    } 

  try {
    Swal.close();
    const data = await response.json();
    let code = data.text;
    let content = code.replace(/\*\*/g, '✨');
    content = content.replace(/\n/g, '<br>');; 
    Swal.fire({
      title: '😁분석결과',
      html: '<div style="text-align: left;">' + content + '</div>', // HTML 형식으로 content 사용
    });
  } catch (error) {
    console.error('Error:', error);
    // 이 catch 블록은 JSON 파싱 또는 그 이후의 로직에서 오류가 발생했을 때 실행됩니다.
    Swal.fire({
      title: '에러',
      text: '분석 중 에러가 발생했습니다!',
      icon: 'error',
      confirmButtonText: '닫기'
    });
  }
}
