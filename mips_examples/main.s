	.text
	.abicalls
	.option	pic0
	.section	.mdebug.abi32,"",@progbits
	.nan	legacy
	.module	fp=xx
	.module	nooddspreg
	.text
	.file	"main.c"
                                        # Start of file scope inline assembly
	.set	push
	.set	at
	.set	macro
	.set	reorder

	.set	noreorder


	.set	pop
                                        # End of file scope inline assembly
	.globl	main                            # -- Begin function main
	.p2align	3
	.type	main,@function
	.set	nomicromips
	.set	nomips16
	.ent	main
main:                                   # @main
	.frame	$fp,32,$ra
	.mask 	0xc0000000,-4
	.fmask	0x00000000,0
	.set	noreorder
	.set	nomacro
	.set	noat
# %bb.0:
	addiu	$sp, $sp, -32
	sw	$ra, 28($sp)                    # 4-byte Folded Spill
	sw	$fp, 24($sp)                    # 4-byte Folded Spill
	move	$fp, $sp
	sw	$zero, 20($fp)
	addiu	$1, $zero, 2
	sw	$1, 16($fp)
	lw	$1, 16($fp)
	sll	$1, $1, 1
	sw	$1, 12($fp)
	lui	$1, %hi($.str)
	addiu	$1, $1, %lo($.str)
	sw	$1, 8($fp)
	lui	$1, %hi($.str.1)
	addiu	$1, $1, %lo($.str.1)
	sw	$1, 4($fp)
	addiu	$2, $zero, 5
	move	$sp, $fp
	lw	$fp, 24($sp)                    # 4-byte Folded Reload
	lw	$ra, 28($sp)                    # 4-byte Folded Reload
	addiu	$sp, $sp, 32
	jr	$ra
	nop
	.set	at
	.set	macro
	.set	reorder
	.end	main
$func_end0:
	.size	main, ($func_end0)-main
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
	.text
