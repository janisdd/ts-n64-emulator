	.text
	.abicalls
	.option	pic0
	.section	.mdebug.abi32,"",@progbits
	.nan	legacy
	.module	fp=xx
	.module	nooddspreg
	.text
	.file	"main.c"
	.globl	mul                             # -- Begin function mul
	.p2align	3
	.type	mul,@function
	.set	nomicromips
	.set	nomips16
	.ent	mul
mul:                                    # @mul
	.frame	$fp,16,$ra
	.mask 	0xc0000000,-4
	.fmask	0x00000000,0
	.set	noreorder
	.set	nomacro
	.set	noat
# %bb.0:
	addiu	$sp, $sp, -16                 # 4 (4 byte)einträge reservieren
	sw	$ra, 12($sp)                    # 4-byte Folded Spill
	sw	$fp, 8($sp)                     # 4-byte Folded Spill
	move	$fp, $sp                      # fp  <- sp
	sw	$4, 4($fp)                      # r4=a0 1. parameter (i) | memory[fp + 4] = a0
	sw	$5, 0($fp)                      # r5=a1 2. parameter (j) | memory[fp + 0] = a1
	lw	$1, 4($fp)                      # r1=a0                  | r1 = memory[fp + 4]
	lw	$2, 0($fp)                      # r2=a1                  | r2 = memory[fp + 0]
	mult	$1, $2                        # r1*r2
	mflo	$2                            # r2=lo(r1*r2)
	move	$sp, $fp                      # sp  <- fp
	lw	$fp, 8($sp)                     # 4-byte Folded Reload
	lw	$ra, 12($sp)                    # 4-byte Folded Reload
	addiu	$sp, $sp, 16                  # 4 (4 byte)einträge freigeben
	jr	$ra                             # rückkehradresse laden (stpc ra)
	nop
	.set	at
	.set	macro
	.set	reorder
	.end	mul
$func_end0:
	.size	mul, ($func_end0)-mul
                                        # -- End function
	.globl	main                            # -- Begin function main
	.p2align	3
	.type	main,@function
	.set	nomicromips
	.set	nomips16
	.ent	main
main:                                   # @main
	.frame	$fp,48,$ra
	.mask 	0xc0000000,-4
	.fmask	0x00000000,0
	.set	noreorder
	.set	nomacro
	.set	noat
# %bb.0:
	addiu	$sp, $sp, -48                 # 12 (4 byte) einträge reservieren
	sw	$ra, 44($sp)                    # 4-byte Folded Spill
	sw	$fp, 40($sp)                    # 4-byte Folded Spill
	move	$fp, $sp                      # $fp  <- $sp
	sw	$zero, 36($fp)                  # store 0 in 36 + $fp
	addiu	$1, $zero, 2                  # $1 = 2 | i = 2
	sw	$1, 32($fp)                     # store 2 in 32 + $fp (reg zuteilung...)
	lw	$1, 32($fp)                     # $1 = 2
	sll	$1, $1, 4                       # $1 = $1 << 4  | $1 = 2 * 16 = 32
	sw	$1, 28($fp)                     # store $1 in 28 + $fp = 32
	lw	$4, 32($fp)                     # $4 = a0 = 2
	lw	$5, 28($fp)                     # $5 = a1 32   (28 + $fp = 32)
	jal	mul                             # call mul
	nop
	sw	$2, 24($fp)
	lui	$1, %hi($.str)
	addiu	$1, $1, %lo($.str)
	sw	$1, 20($fp)
	lui	$1, %hi($.str.1)
	addiu	$1, $1, %lo($.str.1)
	sw	$1, 16($fp)
	addiu	$2, $zero, 5                  # $2 = v0 = 5
	move	$sp, $fp                      # $sp  <- $fp
	lw	$fp, 40($sp)                    # 4-byte Folded Reload
	lw	$ra, 44($sp)                    # 4-byte Folded Reload
	addiu	$sp, $sp, 48                  # 12 (4 byte) einträge freigeben
	jr	$ra                             # rückkehradresse laden (stpc ra)
	nop
	.set	at
	.set	macro
	.set	reorder
	.end	main
$func_end1:
	.size	main, ($func_end1)-main
                                        # -- End function
	.type	$.str,@object                   # @.str
	.section	.rodata.str1.1,"aMS",@progbits,1
$.str:
	.asciz	"Hello World\n"
	.size	$.str, 13

	.type	$.str.1,@object                 # @.str.1
$.str.1:
	.asciz	"Janis\n"
	.size	$.str.1, 7

	.ident	"Homebrew clang version 17.0.4"
	.section	".note.GNU-stack","",@progbits
	.addrsig
	.addrsig_sym mul
	.text
