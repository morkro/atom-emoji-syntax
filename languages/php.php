<?php
/**
 * Keyword: function
 */
function foo ($arg_1, $arg_2, /* ..., */ $arg_n) {
   echo "Example function.\n";
   return $retval;
}

/**
 * Keywords: echo,
 * 			 print
 */
void echo ( string $arg1 [, string $... ] )
int print ( string $arg )

/**
 * Keyword: namespace
 */
namespace foo;

/**
 * Keyword: interface
 */
interface iTemplate {
   public function setVariable($name, $var);
   public function getHtml($template);
}

/**
 * Keyword: include
 */
include 'vars.php';

/**
 * Keyword: goto
 */
goto a;

?>
