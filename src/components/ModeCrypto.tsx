"use client"

import { useState, useEffect } from "react"
import { buildCryptoPayload } from "../lib/buildPayload"
import { validateBitcoinAddress, validateEthereumAddress } from "../lib/validate"
import { AlertCircle, CheckCircle2 } from "lucide-react"

type Props = {
  onPayloadChange: (payload: string) => void
  addToast: (message: string, type: "success" | "error") => void
}

type CryptoType = "bitcoin" | "ethereum" | "lightning"

export default function ModeCrypto({ onPayloadChange, addToast }: Props) {
  const [cryptoType, setCryptoType] = useState<CryptoType>("bitcoin")
  const [address, setAddress] = useState("")
  const [amount, setAmount] = useState("")
  const [chainId, setChainId] = useState("1")
  const [isERC20, setIsERC20] = useState(false)
  const [tokenContract, setTokenContract] = useState("")
  const [recipientAddress, setRecipientAddress] = useState("")
  const [validation, setValidation] = useState<{ valid: boolean; message?: string }>({ valid: true })

  useEffect(() => {
    // Validate address based on type
    if (cryptoType === "bitcoin") {
      const result = validateBitcoinAddress(address)
      setValidation(result)
    } else if (cryptoType === "ethereum") {
      if (isERC20) {
        const contractValid = validateEthereumAddress(tokenContract)
        const recipientValid = validateEthereumAddress(recipientAddress)
        if (!contractValid.valid) {
          setValidation({ valid: false, message: "Invalid token contract address" })
        } else if (!recipientValid.valid) {
          setValidation({ valid: false, message: "Invalid recipient address" })
        } else {
          setValidation({ valid: true })
        }
      } else {
        const result = validateEthereumAddress(address)
        setValidation(result)
      }
    } else {
      setValidation({ valid: true })
    }

    const payload = buildCryptoPayload(
      cryptoType,
      address,
      amount,
      chainId,
      isERC20 ? { tokenContract, recipientAddress } : undefined,
    )
    onPayloadChange(payload)
  }, [cryptoType, address, amount, chainId, isERC20, tokenContract, recipientAddress, onPayloadChange])

  return (
    <div className="space-y-4">
      <div>
        <label className="block text-sm font-medium mb-1">Cryptocurrency</label>
        <select
          value={cryptoType}
          onChange={(e) => {
            const type = e.target.value as CryptoType
            setCryptoType(type)
            setAddress("")
            setIsERC20(false)
          }}
          className="w-full px-3 py-2 border border-border rounded-lg bg-surface"
        >
          <option value="bitcoin">Bitcoin</option>
          <option value="ethereum">Ethereum (EIP-681)</option>
          <option value="lightning">Lightning Network</option>
        </select>
      </div>

      {cryptoType === "ethereum" && (
        <div className="flex items-center gap-2">
          <input
            type="checkbox"
            id="erc20-toggle"
            checked={isERC20}
            onChange={(e) => {
              setIsERC20(e.target.checked)
              if (e.target.checked) {
                setTokenContract("")
                setRecipientAddress("")
              }
            }}
            className="w-4 h-4 rounded border-border"
          />
          <label htmlFor="erc20-toggle" className="text-sm font-medium cursor-pointer">
            ERC-20 Token Transfer
          </label>
        </div>
      )}

      {cryptoType === "ethereum" && isERC20 ? (
        <>
          <div>
            <label className="block text-sm font-medium mb-1">Token Contract Address</label>
            <input
              type="text"
              value={tokenContract}
              onChange={(e) => setTokenContract(e.target.value)}
              placeholder="0x... (e.g., USDC contract)"
              className={`w-full px-3 py-2 border rounded-lg bg-surface ${
                validation.message?.includes("contract") ? "border-red-500" : "border-border"
              }`}
            />
            <div className="text-xs text-foreground/70 mt-1">Example: USDC on Ethereum mainnet (0xA0b8...eB48)</div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Recipient Address</label>
            <input
              type="text"
              value={recipientAddress}
              onChange={(e) => setRecipientAddress(e.target.value)}
              placeholder="0x..."
              className={`w-full px-3 py-2 border rounded-lg bg-surface ${
                validation.message?.includes("recipient") ? "border-red-500" : "border-border"
              }`}
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Token Amount (optional)</label>
            <input
              type="text"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              placeholder="100"
              className="w-full px-3 py-2 border border-border rounded-lg bg-surface"
            />
            <div className="text-xs text-foreground/70 mt-1">
              Amount in token's smallest unit (e.g., for USDC with 6 decimals, 1000000 = 1 USDC)
            </div>
          </div>
        </>
      ) : (
        <div>
          <label className="block text-sm font-medium mb-1">Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            placeholder={cryptoType === "bitcoin" ? "bc1q..." : cryptoType === "ethereum" ? "0x..." : "lnbc..."}
            className={`w-full px-3 py-2 border rounded-lg bg-surface ${
              !validation.valid ? "border-red-500" : "border-border"
            }`}
          />
          {!validation.valid && validation.message && (
            <div className="flex items-center gap-1 mt-1 text-xs text-red-600 dark:text-red-400">
              <AlertCircle className="w-3 h-3" />
              {validation.message}
            </div>
          )}
          {validation.valid && address && (cryptoType === "bitcoin" || cryptoType === "ethereum") && (
            <div className="flex items-center gap-1 mt-1 text-xs text-green-600 dark:text-green-400">
              <CheckCircle2 className="w-3 h-3" />
              Valid address format
            </div>
          )}
        </div>
      )}

      {!(cryptoType === "ethereum" && isERC20) && (
        <div>
          <label className="block text-sm font-medium mb-1">Amount (optional)</label>
          <input
            type="text"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            placeholder="0.01"
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface"
          />
        </div>
      )}

      {cryptoType === "ethereum" && (
        <div>
          <label className="block text-sm font-medium mb-1">Chain ID (1=mainnet)</label>
          <input
            type="text"
            value={chainId}
            onChange={(e) => setChainId(e.target.value)}
            placeholder="1"
            className="w-full px-3 py-2 border border-border rounded-lg bg-surface"
          />
          <div className="text-xs text-foreground/70 mt-1">Common: 1=Ethereum, 10=Optimism, 56=BSC</div>
        </div>
      )}

      <div className="bg-surface-hover border border-border rounded-lg p-3">
        <div className="text-xs font-medium text-foreground mb-1">Payment URI Preview</div>
        <pre className="text-xs font-mono whitespace-pre-wrap break-all text-foreground/80">
          {buildCryptoPayload(
            cryptoType,
            address,
            amount,
            chainId,
            isERC20 ? { tokenContract, recipientAddress } : undefined,
          )}
        </pre>
      </div>
    </div>
  )
}
