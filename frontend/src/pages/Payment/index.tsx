import { useState } from 'react'
import { 
  Container, 
  Typography, 
  Box, 
  Card, 
  CardContent,
  Grid,
  Button,
  Radio,
  RadioGroup,
  FormControlLabel,
  Divider,
  Stack,
  Alert,
  Switch,
  TextField,
  InputAdornment
} from '@mui/material'
import { 
  CreditCard as CardIcon,
  AccountBalance as BankIcon,
  Payment as KakaoIcon,
  ShoppingCart as NaverIcon,
  Apple as AppleIcon,
  Payments as TossIcon  // 임시로 사용
} from '@mui/icons-material'

// 코인 상품 목록 가격 조정
const COIN_PRODUCTS = [
  { id: 1, coins: 10, price: 1200, bonus: 0, tag: '', pricePerCoin: 120 },
  { id: 2, coins: 50, price: 5500, bonus: 5, tag: '보너스 +5', pricePerCoin: 110 },
  { id: 3, coins: 100, price: 10000, bonus: 15, tag: '보너스 +15', pricePerCoin: 100 },
  { id: 4, coins: 300, price: 28500, bonus: 50, tag: '인기 상품', pricePerCoin: 95 },
  { id: 5, coins: 500, price: 45000, bonus: 100, tag: '추천', pricePerCoin: 90 },
  { id: 6, coins: 1000, price: 85000, bonus: 250, tag: '최대 혜택', pricePerCoin: 85 },
]

// 결제 수단 목록
const PAYMENT_METHODS = [
  { id: 'card', label: '신용카드', icon: <CardIcon /> },
  { id: 'bank', label: '계좌이체', icon: <BankIcon /> },
  { id: 'kakao', label: '카카오페이', icon: <KakaoIcon /> },
  { id: 'naver', label: '네이버페이', icon: <NaverIcon /> },
  { id: 'apple', label: '애플페이', icon: <AppleIcon /> },
  { id: 'toss', label: '토스페이', icon: <TossIcon /> },
]

// TODO: [API 연동]
// - 사용자의 실제 보유 포인트 조회 API 연동
// - 결제 처리 API 연동 (PG사 연동)
// - 결제 완료 후 코인 적립 API 연동
// - 결제 실패 시 에러 처리 및 재시도 로직

// TODO: [UI/UX 개선]
// - 결제 진행 상태 표시 (프로그레스바 또는 스텝퍼)
// - 결제 수단별 입력 폼 추가 (카드번호, 계좌번호 등)
// - 결제 완료/실패 모달 또는 페이지 구현
// - 모바일 결제 UI 최적화
// - 결제 수단별 아이콘 이미지로 교체

// TODO: [기능 추가]
// - 자주 사용하는 결제수단 저장 기능
// - 결제 내역 저장 및 조회 기능
// - 영수증 발급 기능
// - 정기 결제(구독) 옵션 추가
// - 쿠폰 사용 기능 추가

// TODO: [보안]
// - 결제 정보 암호화
// - 본인인증 절차 추가
// - 결제 금액 위변조 방지
// - 비정상 결제 시도 차단

// TODO: [검증]
// - 입력값 유효성 검사 강화
// - 결제 금액 계산 로직 검증
// - 포인트 사용 제한 조건 추가
// - 동시 결제 처리 검증

export default function Payment() {
  const [selectedProduct, setSelectedProduct] = useState<number | null>(null)
  const [paymentMethod, setPaymentMethod] = useState('card')
  const [isProcessing, setIsProcessing] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [usePoints, setUsePoints] = useState(false)
  const [useAllPoints, setUseAllPoints] = useState(false)
  const [pointsToUse, setPointsToUse] = useState(0)

  const selectedProductData = COIN_PRODUCTS.find(p => p.id === selectedProduct)
  const availablePoints = 1000 // TODO: 실제 사용자의 포인트 가져오기

  // 최대 사용 가능 포인트 계산
  const calculateMaxPoints = () => {
    if (!selectedProductData) return 0
    // 상품 가격과 보유 포인트 중 작은 값을 반환
    return Math.min(selectedProductData.price, availablePoints)
  }

  // 보너스 코인의 가치 계산 (기본 코인 가격인 120원 기준)
  const calculateBonusValue = (bonus: number) => {
    return bonus * 120  // 기본 코인 가격으로 계산
  }

  // 원래 가격 계산 (보너스 포함)
  const calculateOriginalPrice = () => {
    if (!selectedProductData) return 0
    return (selectedProductData.coins + selectedProductData.bonus) * 120  // 기본 코인 가격으로 계산
  }

  // 최종 결제 금액 계산
  const calculateFinalPrice = () => {
    if (!selectedProductData) return 0
    return selectedProductData.price - (usePoints ? pointsToUse : 0)
  }

  const handlePointsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const value = Number(event.target.value)
    if (value < 0) return
    if (value > availablePoints) return
    if (selectedProductData && value > selectedProductData.price) {
      setPointsToUse(selectedProductData.price)
    } else {
      setPointsToUse(value)
    }
  }

  const handleUsePointsChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const checked = event.target.checked
    setUsePoints(checked)
    if (checked) {
      // 포인트 사용 활성화 시 자동으로 전액 사용
      setUseAllPoints(true)
      setPointsToUse(calculateMaxPoints())
    } else {
      // 포인트 사용 비활성화 시 초기화
      setPointsToUse(0)
      setUseAllPoints(false)
    }
  }

  const handlePayment = async () => {
    if (!selectedProduct) return
    
    setIsProcessing(true)
    setError(null)
    
    try {
      // TODO: 실제 결제 처리 API 연동
      await new Promise(resolve => setTimeout(resolve, 1500)) // 임시 딜레이
      
      // 성공 시 처리
      console.log('결제 성공:', {
        product: selectedProductData,
        method: paymentMethod
      })
      
      // TODO: 성공 페이지로 이동
    } catch (err) {
      setError('결제 처리 중 오류가 발생했습니다. 다시 시도해주세요.')
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Container maxWidth="md">
      <Box sx={{ py: 4 }}>
        <Typography variant="h5" gutterBottom>코인 충전</Typography>
        <Typography color="text.secondary" sx={{ mb: 4 }}>
          원하시는 코인 상품을 선택하고 결제를 진행해주세요.
        </Typography>
        
        {/* 코인 상품 선택 */}
        <Grid container spacing={2} sx={{ mb: 4 }}>
          {COIN_PRODUCTS.map((product) => (
            <Grid item xs={12} sm={6} md={4} key={product.id}>
              <Card 
                sx={{ 
                  cursor: 'pointer',
                  height: '100%',
                  position: 'relative',
                  transition: 'all 0.2s ease-in-out',
                  border: selectedProduct === product.id ? 2 : 1,
                  borderColor: selectedProduct === product.id ? 'primary.main' : 'divider',
                  '&:hover': {
                    transform: 'translateY(-4px)',
                    boxShadow: 3
                  }
                }}
                onClick={() => setSelectedProduct(product.id)}
              >
                {product.tag && (
                  <Box
                    sx={{
                      position: 'absolute',
                      top: 8,
                      right: 8,
                      bgcolor: 'primary.main',
                      color: 'white',
                      px: 1,
                      py: 0.5,
                      borderRadius: 1,
                      fontSize: '0.75rem'
                    }}
                  >
                    {product.tag}
                  </Box>
                )}
                <CardContent>
                  <Stack spacing={1}>
                    <Typography variant="h5" color="primary">{product.coins} 코인</Typography>
                    {product.bonus > 0 && (
                      <Typography variant="body2" color="success.main">
                        +{product.bonus} 보너스 코인
                      </Typography>
                    )}
                    <Typography variant="h6">
                      {product.price.toLocaleString()}원
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      코인당 {product.pricePerCoin}원
                    </Typography>
                  </Stack>
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>

        {/* 결제 수단 선택 */}
        <Card sx={{ mb: 4 }}>
          <CardContent>
            <Typography variant="h6" gutterBottom>결제 수단</Typography>
            <RadioGroup 
              value={paymentMethod} 
              onChange={(e) => setPaymentMethod(e.target.value)}
            >
              <Grid container spacing={2}>
                {PAYMENT_METHODS.map((method) => (
                  <Grid item xs={12} sm={6} key={method.id}>
                    <FormControlLabel 
                      value={method.id} 
                      control={<Radio />} 
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
                          {method.icon}
                          {method.label}
                        </Box>
                      }
                      sx={{
                        width: '100%',
                        mr: 0,
                        p: 1,
                        border: 1,
                        borderColor: paymentMethod === method.id ? 'primary.main' : 'divider',
                        borderRadius: 1
                      }}
                    />
                  </Grid>
                ))}
              </Grid>
            </RadioGroup>
          </CardContent>
        </Card>

        {/* 포인트 사용 */}
        {selectedProduct && (
          <Card sx={{ mb: 4 }}>
            <CardContent>
              <Typography variant="h6" gutterBottom>포인트 사용</Typography>
              <Box sx={{ mb: 2 }}>
                <Typography variant="body2" color="text.secondary" gutterBottom>
                  사용 가능한 포인트: {availablePoints.toLocaleString()}P
                </Typography>
                <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
                  <FormControlLabel
                    control={
                      <Switch
                        checked={usePoints}
                        onChange={handleUsePointsChange}
                      />
                    }
                    label="포인트 사용하기"
                  />
                  {usePoints && (
                    <TextField
                      type="number"
                      size="small"
                      value={pointsToUse}
                      onChange={handlePointsChange}
                      InputProps={{
                        endAdornment: <InputAdornment position="end">P</InputAdornment>,
                      }}
                      sx={{ width: 150 }}
                    />
                  )}
                </Box>
              </Box>
            </CardContent>
          </Card>
        )}

        {/* 에러 메시지 */}
        {error && (
          <Alert severity="error" sx={{ mb: 3 }}>
            {error}
          </Alert>
        )}

        {/* 결제 금액 확인 및 결제하기 버튼 */}
        {selectedProduct && selectedProductData && (
          <Card>
            <CardContent>
              <Stack spacing={2}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>정가 ({selectedProductData.coins + selectedProductData.bonus} 코인)</Typography>
                  <Typography color="text.secondary" sx={{ textDecoration: 'line-through' }}>
                    {calculateOriginalPrice().toLocaleString()}원
                  </Typography>
                </Box>
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography>상품금액</Typography>
                  <Typography>{selectedProductData.price.toLocaleString()}원</Typography>
                </Box>
                {selectedProductData.bonus > 0 && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>보너스 코인</Typography>
                    <Typography color="success.main">
                      +{selectedProductData.bonus} 코인 ({calculateBonusValue(selectedProductData.bonus).toLocaleString()}원 상당)
                    </Typography>
                  </Box>
                )}
                {usePoints && pointsToUse > 0 && (
                  <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                    <Typography>포인트 할인</Typography>
                    <Typography color="error">-{pointsToUse.toLocaleString()}원</Typography>
                  </Box>
                )}
                <Divider />
                <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                  <Typography variant="h6">총 결제금액</Typography>
                  <Box sx={{ textAlign: 'right' }}>
                    <Typography variant="h6" color="primary">
                      {calculateFinalPrice().toLocaleString()}원
                    </Typography>
                    <Typography variant="caption" color="success.main">
                      {Math.round(((calculateOriginalPrice() - calculateFinalPrice()) / calculateOriginalPrice()) * 100)}% 할인
                    </Typography>
                  </Box>
                </Box>
                <Button 
                  variant="contained" 
                  fullWidth 
                  size="large"
                  onClick={handlePayment}
                  disabled={isProcessing}
                >
                  {isProcessing ? '결제 처리중...' : '결제하기'}
                </Button>
                <Typography variant="caption" color="text.secondary" align="center">
                  결제 시 서비스 이용약관 및 개인정보 처리방침에 동의하는 것으로 간주됩니다.
                </Typography>
              </Stack>
            </CardContent>
          </Card>
        )}
      </Box>
    </Container>
  )
} 