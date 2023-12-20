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
	addiu	$sp, $sp, -16
	sw	$ra, 12($sp)                    # 4-byte Folded Spill
	sw	$fp, 8($sp)                     # 4-byte Folded Spill
	move	$fp, $sp
	sw	$4, 4($fp)
	sw	$5, 0($fp)
	lw	$1, 4($fp)
	lw	$2, 0($fp)
	mult	$1, $2
	mflo	$2
	move	$sp, $fp
	lw	$fp, 8($sp)                     # 4-byte Folded Reload
	lw	$ra, 12($sp)                    # 4-byte Folded Reload
	addiu	$sp, $sp, 16
	jr	$ra
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
	addiu	$sp, $sp, -48
	sw	$ra, 44($sp)                    # 4-byte Folded Spill
	sw	$fp, 40($sp)                    # 4-byte Folded Spill
	move	$fp, $sp
	sw	$zero, 36($fp)
	addiu	$1, $zero, 2
	sw	$1, 32($fp)
	lw	$1, 32($fp)
	sll	$1, $1, 4
	sw	$1, 28($fp)
	lw	$4, 32($fp)
	lw	$5, 28($fp)
	jal	mul
	nop
	sw	$2, 24($fp)
	lui	$1, %hi($.str)
	addiu	$1, $1, %lo($.str)
	sw	$1, 20($fp)
	lui	$1, %hi($.str.1)
	addiu	$1, $1, %lo($.str.1)
	sw	$1, 16($fp)
	addiu	$2, $zero, 5
	move	$sp, $fp
	lw	$fp, 40($sp)                    # 4-byte Folded Reload
	lw	$ra, 44($sp)                    # 4-byte Folded Reload
	addiu	$sp, $sp, 48
	jr	$ra
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
